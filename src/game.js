Game = {
  // define grid dimensions
  grid: {
    width: 16,
    height: 20,
    tile: {
      width: 50,
      height: 50
    }
  },

  viewport: {
    width: 16,
    height: 10,
  },

  labels: {
    wordlist: ['bubble','cactus','hummus','platypus','coconut','spatula','kale','lilypad',
    'harpy','yo-yo','dollop','weasel','rubric','skiff','giggle','towel','mustache','bucket',
    'donut','cheddar','splat','potato','helmet','hockeypuck','guacamole','prune','chainsaw',
    'wool','kidney','duck','bamboo','moist','squiggle','aardvark','plunger','blimp','quack',
    'cantaloupe','turnip','pillow','ointment','pickle','poodle','yodel','goblet', 'emu',
    'dongle','spackle','rooster','combo','pail','alarm','sock','polish','surfboard','cone',
    'doorhinge','fungus','muffin','baguette','sauerkraut','cucumber','cupcake','barrel',
    'bug','crumpet','gazebo','gargoyle','gremlin','purple','peon','pogo','spleen','udder',
    'banana','arugula','ham','waffle','marmot','trout','badger','tissue','pigeon','stump',
    'scone','boat','nibble','egg'],
    positions: [
      [-200, 80, 15],
      [-200, 120, 15],
      [-200, 160, 15],
      [-200, 200, 15],
      [-200, 240, 15],
      [-150, 80, 25],
      [-150, 120, 25],
      [-150, 160, 25],
      [-150, 200, 25],
      [-150, 240, 25],
      [-350, 560, -15],
      [-350, 520, -15],
      [-350, 480, -15],
      [-350, 440, -15],
      [-350, 400, -15],
      [-300, 560, -25],
      [-300, 520, -25],
      [-300, 480, -25],
      [-300, 440, -25],
      [-300, 400, -25],
      [-350, 50, 0],
      [-350, 100, 0],
      [-350, 150, 0],
      [-350, 200, 0],
      [-350, 250, 0],
      [-350, 300, 0],
      [-350, 350, 0],
      [-350, 400, 0],
      [-350, 450, 0],
      [-350, 500, 0],
      [-350, 550, 0],
      [-250, 420, -30],
      [-250, 480, -30],
      [-250, 540, -30],
      [-250, 600, -30],
      [-150, 40, 30],
      [-150, 100, 30],
      [-150, 160, 30],
      [-150, 220, 30],
      [-100, -200, 45],
      [-100, -100, 45],
      [-100, 0, 45],
      [-100, 100, 45],
      [-300, 500, -45],
      [-300, 600, -45],
      [-300, 700, -45],
      [-300, 800, -45]
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

    // shuffle label lists
    Game.labels.wordlist = util.shuffle(Game.labels.wordlist);
    Game.labels.positions = util.shuffle(Game.labels.positions);

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
    Crafty.e('Wall').at(7, 6);
    Crafty.e('Wall').at(8, 6);
    Crafty.e('Wall').at(9, 6);
    Crafty.e('Wall').at(9, 7);
    Crafty.e('Wall').at(10, 7);
    Crafty.e('Wall').at(11, 7);
    Crafty.e('Wall').at(12, 7);
    Crafty.e('Wall').at(12, 8);
    Crafty.e('Wall').at(12, 9);
    Crafty.e('Wall').at(11, 9);
    Crafty.e('Wall').at(11, 14);
    Crafty.e('Wall').at(12, 14);
    Crafty.e('Wall').at(13, 14);
    Crafty.e('Wall').at(14, 14);
    Crafty.e('Wall').at(6, 6);
    Crafty.e('Wall').at(6, 7);
    Crafty.e('Wall').at(6, 8);
    Crafty.e('Wall').at(6, 9);
    Crafty.e('Wall').at(6, 12);
    Crafty.e('Wall').at(6, 13);
    Crafty.e('Wall').at(6, 14);
    Crafty.e('Wall').at(7, 14);
    Crafty.e('Wall').at(8, 14);
    Crafty.e('Wall').at(9, 14);
    Crafty.e('Wall').at(10, 14);

    // add restart button
    var restart = Crafty.e('Restart').at(0, 0);

    // add player to map
    var player = Crafty.e('Player').at(2, 2);
    Crafty.viewport.follow(player, 0, 0);

    // add enemies to map
    var enemy1 = Crafty.e('Enemy').at(3, 4);
    enemy1.speed(4);
    enemy1.addToSequence([5, 4]);
    enemy1.addToSequence([5, 1]);
    enemy1.addToSequence([3, 4]);
    enemy1.move();

    var enemy2 = Crafty.e('Enemy').at(7, 4);
    enemy2.speed(4);
    enemy2.addToSequence([7, 1]);
    enemy2.addToSequence([7, 4]);
    enemy2.move();

    var enemy3 = Crafty.e('Enemy').at(9, 1);
    enemy3.speed(5);
    enemy3.addToSequence([9, 5]);
    enemy3.addToSequence([9, 1]);
    enemy3.move();

    var enemy4 = Crafty.e('Enemy').at(11, 6);
    enemy4.speed(6);
    enemy4.addToSequence([11, 1]);
    enemy4.addToSequence([11, 6]);
    enemy4.move();

    var enemy5 = Crafty.e('Enemy').at(13, 1);
    enemy5.speed(7);
    enemy5.addToSequence([13, 7]);
    enemy5.addToSequence([13, 1]);
    enemy5.move();

    var enemy6 = Crafty.e('Enemy').at(13, 13);
    enemy6.speed(7);
    enemy6.addToSequence([13, 8]);
    enemy6.addToSequence([13, 13]);
    enemy6.addToSequence([7, 13]);
    enemy6.addToSequence([13, 13]);
    enemy6.move();

    var enemy7 = Crafty.e('Enemy').at(7, 10);
    enemy7.speed(7);
    enemy7.addToSequence([12, 10]);
    enemy7.addToSequence([12, 13]);
    enemy7.addToSequence([12, 10]);
    enemy7.addToSequence([14, 10]);
    enemy7.addToSequence([7, 10]);
    enemy7.move();

    var enemy8 = Crafty.e('Enemy').at(11, 8);
    enemy8.speed(5);
    enemy8.addToSequence([7, 8]);
    enemy8.addToSequence([11, 8]);
    enemy8.move();
  }
};

