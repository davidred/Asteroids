(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids();
		this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
  };

  Game.prototype.DIM_X = 500;
  Game.prototype.DIM_Y = 500;
  Game.prototype.NUM_ASTEROIDS = 30;

  Game.prototype.addAsteroids = function() {
    for (i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({ game: this, pos: this.randomPosition() }));
    };
  };
	
	Game.prototype.allObjects = function () {
		return this.asteroids.concat(this.ship);
	};

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y]
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 500, 500);

    for (var i in this.allObjects()) {
      this.allObjects()[i].draw(ctx);
    };
  };

  Game.prototype.moveObjects = function () {
    for (var i in this.allObjects()) {
      this.allObjects()[i].move();
    };
  };

  Game.prototype.wrap = function (asteroid) {
    var radius = asteroid.radius;
    var x = asteroid.pos[0];
    var y = asteroid.pos[1];

    if (x > this.DIM_X + radius) {
        asteroid.pos[0] = (0 - radius);
    } else if (x < 0 - radius) {
        asteroid.pos[0] = (this.DIM_X + radius);
    } else if (y < 0 - radius) {
        asteroid.pos[1] = (this.DIM_Y + radius);
    } else if (y > this.DIM_Y + radius) {
        asteroid.pos[1] = (0 - radius);
    }
  };

  Game.prototype.checkCollisions = function() {
    for (i = 0; i < this.allObjects().length - 1; i++) {
      for (j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].collideWith(this.allObjects()[j])) {
          firstAsteroid = this.allObjects()[i];
          secondAsteroid = this.allObjects()[j];

          // this.remove(firstAsteroid);
          // this.remove(secondAsteroid);
        }
      };
    };
  };

  Game.prototype.remove = function(asteroid) {
    index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

})();