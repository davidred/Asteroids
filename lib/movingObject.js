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
	if (this instanceof Asteroids.Ship) {
      this.drawShip(ctx);	
	} else {
	  this.drawAsteroid(ctx);
	}
	

  };
  
  MovingObject.prototype.drawShip = function(ctx) {
    // var R = this.radius
// 	var startPos = [this.pos[0], this.pos[1] - R];
// 	var secondVertex = [startPos[0] + ((Math.sqrt(3) / 2) * R), startPos[1] + (1.5 * R)];
// 	var thirdVertex = [secondVertex[0] - (Math.sqrt(3) * R), secondVertex[1]];
//
	ctx.translate(this.pos[0] - 20, this.pos[1] - 20);
	ctx.rotate(this.direction);
	ctx.drawImage(imgObj, 0, 0, 40, 40);
	ctx.rotate(-this.direction);
	ctx.translate(-this.pos[0] + 20, -this.pos[1] + 20);
	// ctx.fillStyle = this.color;
	// ctx.beginPath();
	// ctx.rotate(0.5);
	// ctx.moveTo(startPos[0], startPos[1]);
	// ctx.lineTo(secondVertex[0], secondVertex[1]);
	// ctx.lineTo(thirdVertex[0], thirdVertex[1]);
	// ctx.closePath();
	// ctx.rotate(-0.5);
	// ctx.fill();
	
	// debugger
  };
  
  MovingObject.prototype.drawAsteroid = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();
  }

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

  MovingObject.prototype.collideWith = function(otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

})();