(function() {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var ExplosionShard = Asteroids.ExplosionShard = function(options) {
    // options.radius = 1;
    // options.color = "#C9002C";

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(ExplosionShard, Asteroids.MovingObject);

})();
