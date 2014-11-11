(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ship = Asteroids.Ship = function(options) {
    this.direction = 0;
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
    //move in direction of ship
    var shipDirection = this.findDirectionUnitVector();
    if (impulse < 0 ) {
      this.vel[0] -= shipDirection[0] * Math.abs(impulse)
      this.vel[1] -= shipDirection[1] * Math.abs(impulse)
    } else {
      this.vel[0] += shipDirection[0] * Math.abs(impulse)
      this.vel[1] += shipDirection[1] * Math.abs(impulse)
    }
    //move forward or back
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
  };

  Ship.prototype.rotate = function(turn) {
	this.direction += turn;
  if (this.direction > Math.PI * 2) {
    this.direction = 0;
  } else if (this.direction < 0) {
    this.direction = Math.PI * 2;
  }
  console.log(this.direction);
  console.log(this.findDirectionUnitVector());
  };

  Ship.prototype.fireBullet = function() {
    var game = this.game;
    var pos = this.pos.slice();
    var shipVel = this.vel.slice();
    var shipDirection = this.findDirectionUnitVector();
    var bulletVel = [(shipDirection[0] * this.BULLET_SPEED), (shipDirection[1] * this.BULLET_SPEED)]
//    var projectileVel = [(bulletVel[0] + shipVel[0]), (bulletVel[1] + shipVel[1])];

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

  Ship.prototype.findDirectionUnitVector = function() {
    var x = Math.cos(this.direction);
    var y = Math.sin(this.direction);
    return [x, y];
  }

  Ship.prototype.BULLET_SPEED = 5;

})();
