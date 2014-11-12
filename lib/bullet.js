(function () {
  if (typeof MovingObject === "undefined") {
    window.MovingObject = {};
  }

	var Bullet = Asteroids.Bullet = function(options) {
		options['radius'] = 2;
		options['color'] = 'red';

		Asteroids.MovingObject.call(this, options);
		this.vel = this.newVel(options.vel);
	};

	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {

      var x1 = this.pos[0];
      var y1 = this.pos[1];
      var x2 = otherObject.pos[0];
      var y2 = otherObject.pos[1];

      var distance = Math.sqrt(
        (Math.pow((x1 -  x2), 2) + Math.pow((y1 - y2), 2))
      )
      
      if (distance <= this.radius + otherObject.radius) {
				this.game.remove(otherObject);
				this.game.remove(this);
      }
    }
	},

  Bullet.prototype.newVel = function (velocity) {
    var x = velocity[0];
    var y = velocity[1];

    var magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    var x2 = (x / magnitude) * 20;
    var y2 = (y / magnitude) * 20;
    return [x2, y2]
  };

})();
