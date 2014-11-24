(function() {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var ExplosionShard = Asteroids.ExplosionShard = function(options) {
    options.color = this.COLOR[Math.floor(Math.random() * 5)];
    // options.color = "#0f0";
    this.red = parseInt(options.color[1],16);
    this.green = parseInt(options.color[2],16);

    options.radius = this.RADIUS[Math.floor(Math.random() * 3)];
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(ExplosionShard, Asteroids.MovingObject);

  //ExplosionShard.prototype.COLOR = ["#f00", "#0ff", "#ff0"]
  ExplosionShard.prototype.COLOR = ["#fa0", "#f00", "#f60", "#C00", "#f40"]
  ExplosionShard.prototype.RADIUS = [0.4,1,2];
  ExplosionShard.prototype.VELOCITY = [1.4, 1.9, 2.1, 3, 4];
})();
