(function () {
  if (typeof MovingObject === "undefined") {
    window.MovingObject = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    this.trailLength = 50;
    this.direction = game.ship.direction;
    this.startLocation = game.ship.pos;
    options.color = "#11f7fd";
    options.color = "#7fff00";
    options.radius = 3;

    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


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

  // Bullet.prototype.collideWith = function(otherObject) {
  //   debugger
  //   if (otherObject instanceof Asteroids.Asteroid) {
  //     this.game.remove(otherObject);
  //     this.game.remove(this);
  //   }
  // }

})();
