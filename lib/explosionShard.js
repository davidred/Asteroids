(function() {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var ExplosionShard = Asteroids.ExplosionShard = function(options) {

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(ExplosionShard, Asteroids.MovingObject);

})();
