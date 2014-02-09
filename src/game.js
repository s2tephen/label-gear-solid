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

  labels: {
    wordlist: ['cactus','hummus','blade','laser','blazer','spatula','kale','lilypad','harpy','yo-yo','dollop','weasel','rubric','skiff','giggle','towel','mustache','bucket','donut','cheddar','splat','potato','helmet','hockeypuck','guacamole','prune','chainsaw','wool','kidney','duck','bamboo','moist','squiggle','aardvark','plunger','blimp','cantaloupe','turnip','lard','pillow','ointment','pickle','poodle','yodel','goblet','dangle','spackle','rooster','combo','pail','alarm','sock','polish','surfboard','cone','doorhinge','fungus'],
    positions: [
      [0, 80, 15],
      [0, 120, 15],
      [0, 160, 15],
      [0, 200, 15],
      [0, 240, 15],
      [0, 80, 25],
      [0, 120, 25],
      [0, 160, 25],
      [0, 200, 25],
      [0, 240, 25],
      [-200, 560, -15],
      [-200, 520, -15],
      [-200, 480, -15],
      [-200, 440, -15],
      [-200, 400, -15],
      [-200, 560, -25],
      [-200, 520, -25],
      [-200, 480, -25],
      [-200, 440, -25],
      [-200, 400, -25],
      [-200, 50, 0],
      [-200, 100, 0],
      [-200, 150, 0],
      [-200, 200, 0],
      [-200, 250, 0],
      [-200, 300, 0],
      [-200, 350, 0],
      [-200, 400, 0],
      [-200, 450, 0],
      [-200, 500, 0],
      [-200, 550, 0],
      [-200, 600, 0],
      [-150, 420, -30],
      [-150, 480, -30],
      [-150, 540, -30],
      [-150, 600, -30],
      [0, 40, 30],
      [0, 100, 30],
      [0, 160, 30],
      [0, 220, 30],
      [0, 100, 45],
      [0, 200, 45],
      [0, 300, 45],
      [0, 400, 45],
      [-200, 540, -45],
      [-200, 440, -45],
      [-200, 340, -45],
      [-200, 240, -45]
    ]
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
    Crafty.viewport.bounds = {
      min: {x: 0, y: 0},
      max: {x: Game.width(), y: Game.height()}
    };

    // import utility functions
    util = new Util();

    // draw map
    // Game.grid.map = [];
    // util.from_to(0, Game.grid.width - 1, function(c) {
    //   Game.grid.map.push([]);
    // });
    util.from_to_2d(0, Game.grid.width - 1, 0, Game.grid.height - 1, function(c) {
      // TODO: remove
      // Crafty.e('2D, Color, DOM')
      //       .attr({
      //         x: c[0] * Game.grid.tile.width,
      //         y: c[1] * Game.grid.tile.width,
      //         w: Game.grid.tile.width,
      //         h: Game.grid.tile.height
      //       })
      //       .css({
      //         'border': '1px solid #000',
      //         'box-sizing': 'border-box'
      //       });

      // outer walls
      if (c[0] === 0 || c[0] === Game.grid.width - 1 || c[1] === 0 || c[1] === Game.grid.height - 1) {
        Crafty.e('Wall').at(c[0], c[1]);
      }
    });

    // add walls to map
    Crafty.e('Wall').at(1, 4);
    Crafty.e('Wall').at(2, 4);
    Crafty.e('Wall').at(2, 5);
    Crafty.e('Wall').at(3, 5);
    Crafty.e('Wall').at(4, 5);
    Crafty.e('Wall').at(5, 5);
    Crafty.e('Wall').at(6, 5);
    Crafty.e('Wall').at(7, 5);
    Crafty.e('Wall').at(8, 5);

    // add player to map
    var player = Crafty.e('Player').at(2, 2);
    Crafty.viewport.follow(player, 0, 0);

    // add enemies to map
    var enemy1 = Crafty.e('Enemy').at(8, 4);
    enemy1.speed(4);
    enemy1.addToSequence([8, 1]);
    enemy1.addToSequence([8, 4]);
    enemy1.move();

    var enemy2 = Crafty.e('Enemy').at(3, 4);
    enemy2.speed(4);
    enemy2.addToSequence([5, 4]);
    enemy2.addToSequence([5, 1]);
    enemy2.addToSequence([3, 4]);
    enemy2.move();

    var enemy3 = Crafty.e('Enemy').at(10, 1);
    enemy3.speed(4);
    enemy3.addToSequence([10, 4]);
    enemy3.addToSequence([10, 1]);
    enemy3.move();

    var enemy4 = Crafty.e('Enemy').at(12, 5);
    enemy4.speed(4);
    enemy4.addToSequence([12, 1]);
    enemy4.addToSequence([12, 5]);
    enemy4.move();
  }
};