(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();
    // console.log(this.pos);
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.game.wrap(this);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    if (this === otherObject) {
      return false
    } else {

      x1 = this.pos[0];
      y1 = this.pos[1];

      x2 = otherObject.pos[0];
      y2 = otherObject.pos[1];

      distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      if (distance <= this.radius + otherObject.radius) {
        return true;
      } else {
        return false;
      }
    }
  };

})();