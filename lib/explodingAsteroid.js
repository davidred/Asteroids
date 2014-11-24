(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var explodingAsteroid = Asteroids.explodingAsteroid = function(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    this.red = 0;
    this.green = 16;
    options.vel = [0,0];
    options.color = "#ff0";

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(explodingAsteroid, Asteroids.MovingObject);

})();
