(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ship = Asteroids.Ship = function(options) {
    this.direction = Math.PI;
    options.color = "#C9002C";
    options.radius = 20;
    options.vel = [0,0];
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.rotate = function(turn) {
	this.direction += turn;
  };

  Ship.prototype.fireBullet = function() {
    var game = this.game;
    var pos = this.pos.slice();
    var shipVel = this.vel.slice();
    var shipNormal = this.findNormal(shipVel);
    var bulletVel = [shipNormal[0] * this.BULLET_SPEED, shipNormal[1] * this.BULLET_SPEED];
    // var bulletNormal = this.findNormal(shipVel);
    // var bulletSpeed = this.findSpeed(shipVel);
    // var bulletVel = [bulletSpeed * bulletNormal[0], bulletSpeed * bulletNormal[1]];

    this.game.bullets.push(new Asteroids.Bullet({game: game, pos: pos, vel: bulletVel}));
  };

  Ship.prototype.findSpeed = function(vel) {
    var vx = vel[0];
    var vy = vel[1];

    return speed = Math.sqrt( Math.pow(vx, 2) + Math.pow(vy, 2) );
  };

  Ship.prototype.findNormal = function(vel) {
    var vx = vel[0];
    var vy = vel[1];

    var speed = Math.sqrt( Math.pow(vx, 2) + Math.pow(vy, 2) );
    return [vx/speed, vy/speed];
  };

  Ship.prototype.BULLET_SPEED = 5;

})();