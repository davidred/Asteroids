(function() {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Star = Asteroids.Star = function(options) {
    options.radius = Math.floor(Math.random() * 2) + 1;
    options.color = "#f5fd90";
    options.vel = [Math.random() + 0.1,0];

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Star, Asteroids.MovingObject);

})();
