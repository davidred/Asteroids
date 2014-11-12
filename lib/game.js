(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids();
		this.bullets = [];
		this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
  };

  Game.prototype.DIM_X = 900;
  Game.prototype.DIM_Y = 500;
  Game.prototype.NUM_ASTEROIDS = 2;

  Game.prototype.addAsteroids = function() {
    for (i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this, pos: this.randomPosition() }));
    };
  };

	Game.prototype.add = function (obj) {
		if (obj instanceof Asteroids.Asteroid) {
			this.asteroids.push(obj);
		} else if (obj instanceof Asteroids.Bullet) {
			this.bullets.push(obj);
		}
	};

	Game.prototype.allObjects = function () {
		return this.asteroids.concat(this.ship).concat(this.bullets);
	};

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y]
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 900, 500);

    for (var i in this.allObjects()) {
      this.allObjects()[i].draw(ctx);
    };
  };

  Game.prototype.moveObjects = function () {
    for (var i in this.allObjects()) {
      this.allObjects()[i].move();
    };
  };

  Game.prototype.wrap = function (obj) {
    var radius = obj.radius;
    var x = obj.pos[0];
    var y = obj.pos[1];

		if (x > this.DIM_X + radius) {
			if (obj instanceof Asteroids.Bullet) {
				this.remove(obj);
			}
		  obj.pos[0] = (0 - radius);
    } else if (x < 0 - radius) {
			if (obj instanceof Asteroids.Bullet) {
				this.remove(obj);
			}
		  obj.pos[0] = (this.DIM_X + radius);
    } else if (y < 0 - radius) {
			if (obj instanceof Asteroids.Bullet) {
				this.remove(obj);
			}
			obj.pos[1] = (this.DIM_Y + radius);
    } else if (y > this.DIM_Y + radius) {
			if (obj instanceof Asteroids.Bullet) {
				this.remove(obj);
			}
			obj.pos[1] = (0 - radius);
    }
  };

  Game.prototype.checkCollisions = function() {
    for (i = 0; i < this.allObjects().length - 1; i++) {
      for (j = 0; j < this.allObjects().length - 1; j++) {
        if (i != j && (this.allObjects()[i] && this.allObjects()[j]) ) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      };
    };
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
			index = this.asteroids.indexOf(obj);
	    this.asteroids.splice(index, 1);
		} else if (obj instanceof Asteroids.Bullet) {
			index = this.bullets.indexOf(obj);
	    this.bullets.splice(index, 1);
		}
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

})();
