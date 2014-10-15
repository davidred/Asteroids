(function () {
  if (typeof MovingObject === "undefined") {
    window.MovingObject = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    // var bulletNormalVel = this.findNormal(options.vel)
//     var bulletSpeed = this.findSpeed(options.vel) + this.BULLET_SPEED
//     var bulletVel = [ bulletNormalVel[0] * bulletSpeed, bulletNormalVel[1] * bulletSpeed ];

    // options.vel = [0,-2];
    options.color = "#000000";
    options.radius = 2;
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.BULLET_SPEED = 10;

  Bullet.prototype.findSpeed = function(vel) {
    var vx = vel[0];
    var vy = vel[1];

    return speed = Math.sqrt( Math.pow(vx, 2) + Math.pow(vy, 2) );
  };

  Bullet.prototype.findNormal = function(vel) {
    var vx = vel[0];
    var vy = vel[1];

    var speed = Math.sqrt( Math.pow(vx, 2) + Math.pow(vy, 2) );
    return [vx/speed, vy/speed];
  };

})();