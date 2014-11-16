(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.bullets = [];
    this.asteroids = [];
  	this.explodingAsteroids = [];
    this.explosionShards = [];
    this.allObj = [];

    this.addAsteroids();
    this.ship = new Asteroids.Ship({game: this, pos: [this.DIM_X/2, this.DIM_Y/2]});
  };

  Game.prototype.DIM_X = 500;
  Game.prototype.DIM_Y = 500;
  Game.prototype.NUM_ASTEROIDS = 5;

  Game.prototype.addAsteroids = function() {
    for (i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({ game: this, pos: this.randomPosition() }));
    };
  };

  Game.prototype.allObjects = function () {
	   this.allObj = this.asteroids.concat(this.bullets, this.ship, this.explodingAsteroids, this.explosionShards);
     return this.allObj;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 500, 500);

    for (var i in this.allObj) {
      this.allObj[i].draw(ctx);
    };
  };

  Game.prototype.moveObjects = function () {
    for (var i in this.allObj) {
      this.allObj[i].move();
    };
  };

  Game.prototype.wrap = function (asteroid) {

    var radius = asteroid.radius;
    var x = asteroid.pos[0];
    var y = asteroid.pos[1];

    if (x > this.DIM_X + radius) {
      if (asteroid instanceof Asteroids.ExplosionShard) {
        debugger
      }
      if (asteroid instanceof Asteroids.Bullet || asteroid instanceof Asteroids.ExplosionShard) {
        this.remove(asteroid)
      }
      asteroid.pos[0] = (0 - radius);
    } else if (x < 0 - radius) {
      if (asteroid instanceof Asteroids.Bullet || asteroid instanceof Asteroids.ExplosionShard) {
        this.remove(asteroid)
      }
      asteroid.pos[0] = (this.DIM_X + radius);
    } else if (y < 0 - radius) {
      if (asteroid instanceof Asteroids.Bullet || asteroid instanceof Asteroids.ExplosionShard) {
        this.remove(asteroid)
      }
      asteroid.pos[1] = (this.DIM_Y + radius);
    } else if (y > this.DIM_Y + radius) {
      if (asteroid instanceof Asteroids.Bullet || asteroid instanceof Asteroids.ExplosionShard) {
        this.remove(asteroid)
      }
      asteroid.pos[1] = (0 - radius);
    }
  };

  Game.prototype.checkCollisions = function() {
    var allObjects = this.allObjects();

    for (i = 0; i < allObjects.length - 1; i++) {
      for (j = i + 1; j < allObjects.length; j++) {
        if (allObjects[i].isCollidedWith(allObjects[j])) {
          firstObject = allObjects[i];
          secondObject = allObjects[j];

          firstObject.collideWith(secondObject);
        }
      };
    };
  };

  Game.prototype.remove = function(targetObject) {
    if (targetObject instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(targetObject);
      this.bullets.splice(index, 1);
    } else if (targetObject instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(targetObject);
      this.asteroids.splice(index, 1);
    } else if (targetObject instanceof Asteroids.explodingAsteroid) {
      var index = this.asteroids.indexOf(targetObject);
      this.explodingAsteroids.splice(index, 1);
    } else if (targetObject instanceof Asteroids.ExplosionShard) {
      var index = this.asteroids.indexOf(targetObject);
      this.explosionShards.splice(index, 1);
    }
  };

  Game.prototype.checkTurnPress = function() {
    if(key.isPressed("a") || key.isPressed("left")) {
      ship.rotate(-0.05);
    } else if (key.isPressed("d") || key.isPressed("right")) {
      ship.rotate(0.05);
    }
  }

  Game.prototype.checkShootPress = function() {
    if(key.isPressed("space")) {
      ship.fireBullet();
    }
  }

  Game.prototype.checkMovePress = function() {
    if(key.isPressed("w") || key.isPressed("up")) {
      ship.power(0.05);
    } else if (key.isPressed("s") || key.isPressed("down")) {
      ship.power(-0.05);
    }
  }

  Game.prototype.step = function() {
    this.checkTurnPress();
    this.checkMovePress();
    // this.checkShootPress();
    this.moveObjects();
    this.checkCollisions();
  };

})();
