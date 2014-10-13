(function () {
  if (typeof)

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.color = this.COLOR;
    options.radius = this.RADIUS;
    options.vel = Asteroids.Util.randomVec(Math.random() * 20)
    MovingObject.call(this, options)
  };



  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();