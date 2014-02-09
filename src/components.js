Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.grid.tile.width,
      h: Game.grid.tile.height
    });
  },

  // places entity at a particular cell
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x / Game.grid.tile.width, y: this.y / Game.grid.tile.height };
    }
    else {
      this.attr({ x: x * Game.grid.tile.width, y: y * Game.grid.tile.height });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, DOM, Grid');
  },
});

Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Delay, Fourway, Color, Collision')
      .fourway(3)
      .color('rgb(255, 0, 0)')
      .stopOnSolids()
      .failOnEnemies();
  },

  // event handler for wall collisions
  stopOnSolids: function() {
    this.onHit('Solid', this.stop_movement);
    return this;
  },

  // stop player movement
  stop_movement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  // event handler for enemy collisions
  failOnEnemies: function() {
    this.onHit('Enemy', this.fail_state);
    return this;
  },

  // reset player position, add label
  fail_state: function() {
    this.stop_movement();
    var mask = Crafty.e("2D, Canvas, DOM, Delay, Tween, Color")
          .attr({
            alpha: 1,
            x: 0,
            y: 0,
            w: Game.width(),
            h: Game.height()
          })
          .color('rgb(0, 0, 0)');
    mask.delay(function() {
      this.tween({ alpha: 0 }, 350);
    }, 350);
    mask.delay(function() {
      this.destroy();
    }, 800);
    this.at(2, 2);
    var position = Game.labels.positions[Math.floor(Math.random() * Game.labels.positions.length)];
    util.remove(Game.labels.positions, position);
    var label = Crafty.e('Label').attr({
      x: position[0],
      y: position[1],
      rotation: position[2],
      w: 1500,
      h: 120
    });
  }
});

Crafty.c('Label', {
  init: function() {
    this.requires('2D, Canvas, Color, DOM, Text')
        .color('rgb(255, 255, 255')
        .css({
          'border': '1px solid rgba(0, 0, 0, 0.9)',
          'box-shadow': '0 2px 2px rgba(0, 0, 0, 0.3)',
          'text-align': 'center',
          'text-transform': 'uppercase'
        })
        .text(Game.labels.wordlist[Math.floor(Math.random() * Game.labels.wordlist.length)])
        .textFont({
          weight: 'bold',
          size: '6em',
          family: 'Montserrat'
        });
    this._element.parentNode.removeChild(this._element);
    Crafty.stage.elem.appendChild(this._element);
    this.z = 100;
  },
});

Crafty.c('Wall', {
  init: function() {
    this.requires('Actor, Color, Solid')
        .color('rgb(128, 128, 128)');
  }
});

Crafty.c('Patrol', {
  init: function(speed) {
    this.requires('Delay, Grid, Tween');
    this._movement = {
      speed: 2, // tiles per second
      queue: []
    };
  },

  speed: function(tps) {
    this._movement.speed = tps;
  },

  position: function() {
    return this._movement.queue[this._movement.queue.length - 1];
  },

  sequence: function() {
    return this._movement.queue;
  },

  addToSequence: function(c) {
    this._movement.queue.push(c);
  },

  move: function() {
    if (this._movement.queue.length !== 0) {
      var timeToMove = util.distance(this.position()[0] - this._movement.queue[0][0], this.position()[1] - this._movement.queue[0][1]) / this._movement.speed * 1000;
      this.tween({
        x: this._movement.queue[0][0] * Game.grid.tile.width,
        y: this._movement.queue[0][1] * Game.grid.tile.height
      }, timeToMove);
      targetPosition = this._movement.queue.shift();
      this._movement.queue.push(targetPosition);
      this.delay(this.move, timeToMove + 200, 0);
    }
  }
});

Crafty.c('Enemy', {
  init: function() {
    this.requires('Actor, Color, Patrol')
        .color('rgb(0, 0, 255)');
  }
});