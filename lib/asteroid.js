(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {

    options.color = this.COLOR[Math.floor(Math.random() * 5)];
    options.radius = this.RADIUS * Math.random() + 8;
    options.vel = Asteroids.Util.randomVec(Math.random() * 5);
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.COLOR = ["#304f87", "#7d1935", "#7828ac", "#649987", "#bfacc0"];
  Asteroid.prototype.RADIUS = 15;
	
	Asteroid.prototype.collideWith = function (otherObject) {
    if (this === otherObject) {
      return false
    } else if (otherObject instanceof Asteroids.Ship) {

      x1 = this.pos[0];
      y1 = this.pos[1];

      x2 = otherObject.pos[0];
      y2 = otherObject.pos[1];

      distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      if (distance <= this.radius + otherObject.radius) {
				otherObject.relocate();
        return true;
      } else {
        return false;
      }
    }
	};

})();