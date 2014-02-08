Game = {
  // define grid dimensions
  grid: {
    width: 32,
    height: 20,
    tile: {
      width: 64,
      height: 64
    }
  },

  viewport: {
    width: 16,
    height: 10,
  },

  // return stage width
  width: function() {
    return this.grid.width * this.grid.tile.width;
  },

  // return stage height
  height: function() {
    return this.grid.height * this.grid.tile.height;
  },

  // return viewport width
  vp_width: function() {
    return this.viewport.width * this.grid.tile.width;
  },

  // return viewport height
  vp_height: function() {
    return this.viewport.height * this.grid.tile.height;
  },

  // initialize game
  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.viewport.init(Game.vp_width(), Game.vp_height());

    // import utility functions
    util = new Util();

    // draw map
    Game.grid.map = [];
    util.from_to(0, Game.grid.width - 1, function(c) {
      Game.grid.map.push([]);
    });
    util.from_to_2d(0, Game.grid.width - 1, 0, Game.grid.height - 1, function(c) {
      // TODO: remove
      Crafty.e('2D, Color, DOM')
            .attr({
              x: c[0] * Game.grid.tile.width,
              y: c[1] * Game.grid.tile.width,
              w: Game.grid.tile.width,
              h: Game.grid.tile.height
            })
            .css({
              'border': '1px solid #000',
              'box-sizing': 'border-box'
            });
      // outer walls
      if (c[0] === 0 || c[0] === Game.grid.width - 1 || c[1] === 0 || c[1] === Game.grid.height - 1) {
        Crafty.e('Wall').at(c[0], c[1]);
      }
    });

    // add player to map
    var player = Crafty.e('Player').at(5, 5);
    Crafty.viewport.follow(player, 0, 0);

    // add enemies to map
    var enemy = Crafty.e('Enemy').at(8, 8)
                                 .addToSequence([8, 8]);
  }
};