(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var explodingAsteroid = Asteroids.explodingAsteroid = function(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    options.vel = [0,0];
    options.color = "#C9002C";

    Asteroids.MovingObject.call(this, options);

  };

  Asteroids.Util.inherits(explodingAsteroid, Asteroids.MovingObject);

})();
