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
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(4)
      .color('rgb(255, 0, 0)')
      .stopOnSolids();
  },

  // event handler for wall collisions
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  // stop player movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});

Crafty.c('Wall', {
  init: function() {
    this.requires('Actor, Color, Solid')
        .color('rgb(128, 128, 128)');
  }
});

Crafty.c('Patrol', {
  movement: {
    speed: 2,
    queue: []
  },

  init: function() {
    this.requires('Grid');
  },

  sequence: function() {
    return this.movement.queue;
  },

  addToSequence: function(c) {
    this.movement.queue.push(c);
  }
});

Crafty.c('Enemy', {
  init: function() {
    this.requires('Actor, Color, Patrol')
        .color('rgb(0, 0, 255)');
  }
});