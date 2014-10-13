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

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

})();