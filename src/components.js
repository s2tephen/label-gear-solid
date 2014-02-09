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

Crafty.c('Restart', {
  init: function() {
    this.requires('2D, Canvas, DOM, Grid, Mouse, Text')
        .text('&#61666;')
        .css({
          'color': 'rgb(255, 0, 0)',
          'margin-top': '16px',
          'margin-left': '16px',
          'text-shadow': '0 2px 2px rgba(0, 0, 0, 0.3)',
        })
        .textFont({
          weight: 'bold',
          size: '2em',
          family: 'FontAwesome'
        });
    this._element.parentNode.removeChild(this._element);
    Crafty.stage.elem.appendChild(this._element);
    this.z = 101;
    Crafty.addEvent(this, this._element, 'mouseover', this._onmouseover);
    Crafty.addEvent(this, this._element, 'mousedown', this._onmousedown);
  },

  _onmouseover: function() {
    this.css({
      'cursor': 'pointer'
    });
  },

  _onmousedown: function() {
    var allLabels = '';
    $('.Label').each(function() {
      allLabels += $(this).text();
      allLabels += ' ';
    });
    if (allLabels === '') {
      allLabels = 'person who gives up without even trying';
    }
    Crafty('Wall').destroy();
    Crafty('Enemy').destroy();
    $('.Label').remove();
    $('.Restart').remove();
    Crafty('Player').tween({
      x: Game.vp_width() / 2 - Game.grid.tile.width / 2,
      y: Game.vp_height() / 2 - Game.grid.tile.height / 2 - Crafty.viewport._y,
    }, 350);
    // Crafty.viewport.zoom(2.4, Game.vp_width() / 2, Game.vp_height() / 2, 350);
    Crafty.e('2D, DOM, Text')
          .css({
            'text-align': 'center',
            'text-transform': 'uppercase'
          })
          .textFont({
            weight: 'bold',
            size: '2.4em',
            family: 'Montserrat'
          })
          .text('You lose!')
          .attr({
            w: Game.width(),
            x: 0,
            y: Game.vp_height() / 3 - Crafty.viewport._y
          });
    Crafty.e('2D, DOM, Text')
          .css({
            'text-align': 'center',
            'text-transform': 'uppercase'
          })
          .textFont({
            weight: 'bold',
            size: '1.6em',
            family: 'Montserrat'
          })
          .text('&uarr;')
          .attr({
            w: Game.width(),
            x: 0,
            y: 2 * Game.vp_height() / 3 - Game.grid.tile.height - Crafty.viewport._y
          });
    Crafty.e('2D, DOM, Text')
          .css({
            'text-align': 'center',
            'text-transform': 'uppercase'
          })
          .textFont({
            weight: 'bold',
            size: '1.6em',
            family: 'Montserrat'
          })
          .text('You are a ' + allLabels.trim())
          .attr({
            w: Game.width() - Game.grid.tile.width * 4,
            x: Game.grid.tile.width * 2,
            y: 2 * Game.vp_height() / 3 - Game.grid.tile.height / 2 - Crafty.viewport._y
          });
    setTimeout(function() {
      location.reload();
    }, 8000);
  }
});

Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Delay, Fourway, Color, Collision, Tween')
      .fourway(4)
      .color('rgb(255, 0, 0)')
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
    var position = Game.labels.positions.shift();
    Game.labels.positions.push(position);
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
    var word = Game.labels.wordlist.shift();
    this.requires('2D, Canvas, Color, DOM, Text')
        .color('rgb(255, 255, 255')
        .css({
          'border': '1px solid rgba(0, 0, 0, 0.9)',
          'box-shadow': '0 2px 2px rgba(0, 0, 0, 0.3)',
          'text-align': 'center',
          'text-transform': 'uppercase'
        })
        .text(word)
        .textFont({
          weight: 'bold',
          size: '6em',
          family: 'Montserrat'
        });
    Game.labels.wordlist.push(word);
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