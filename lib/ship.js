(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    options.color = "yellow";
    options.radius = 20;
    options.vel = [0,0];
    Asteroids.MovingObject.call(this, options)
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = [0,0];
	};

	Ship.prototype.power = function (impulse) {
		this.vel[0] += impulse[0];
    if (this.vel[0] > 10) {
      this.vel[0] = 10
    } else if (this.vel[0] < -10) {
      this.vel[0] = -10
    }

		this.vel[1] += impulse[1];

    if (this.vel[1] > 10) {
      this.vel[1] = 10
    } else if (this.vel[1] < -10) {
      this.vel[1] = -10
    }
	};

	Ship.prototype.fireBullet = function () {
    var newVel = [this.vel[0], this.vel[1]];
    var newPos = [this.pos[0], this.pos[1]];
    console.log(newPos);

		var bullet = new Asteroids.Bullet({pos: newPos, vel: newVel, game: this.game});
		this.game.add(bullet);


	};

	Ship.prototype.collideWith = function () {
	};
})();
