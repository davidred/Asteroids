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
  	} else if (this instanceof Asteroids.Bullet) {
      this.drawBullet(ctx);
    } else if (this instanceof Asteroids.explodingAsteroid) {
      this.drawExplodingAsteroid(ctx);
    } else if (this instanceof Asteroids.ExplosionShard) {
      this.drawExplosionShard(ctx);
    } else if (this instanceof Asteroids.Star) {
      this.drawStar(ctx);
    } else {
  	  this.drawAsteroid(ctx);
  	}
  };

  MovingObject.prototype.drawShip = function(ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction + Math.PI/4);
  	ctx.drawImage(imgObj, -20, -20, 40, 40);
    ctx.rotate(-this.direction - Math.PI/4);
    ctx.translate(-this.pos[0],-this.pos[1]);
  };

  MovingObject.prototype.drawBullet = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction);
    //ctx.fillRect(0, -this.radius, this.trailLength, this.radius*2);
    var distance = Asteroids.Util.getDistance(this.startLocation, this.pos);
    ctx.fillRect(0, -this.radius, -distance, this.radius*2);
    ctx.rotate(-this.direction);
    ctx.translate(-this.pos[0],-this.pos[1]);

  };

  MovingObject.prototype.drawAsteroid = function(ctx) {
    ctx.drawImage(images[this.image], this.pos[0] - this.radius, this.pos[1] - this.radius, 2*this.radius, 2*this.radius);
  };

  MovingObject.prototype.drawExplodingAsteroid = function(ctx) {
    var color = "#" + this.addRed(this.red) + this.subtractGreen(this.green) + "0";
    ctx.beginPath();
    // ctx.fillStyle = this.color;
    ctx.fillStyle = color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();
  };

  MovingObject.prototype.addRed = function(value) {
    if (value < 15) {
      this.red += 0.2;
    }
    var hex = Math.floor(this.red).toString(16);
    return hex;
  };

  MovingObject.prototype.subtractRed = function(value) {
    if (value > 7) {
      this.red -= 0.2;
    }
    var hex = Math.floor(this.red).toString(16);
    return hex;
  };

  MovingObject.prototype.addGreen = function(value) {
    if (value < 16) {
      this.green += 0.2;
    }
    var hex = Math.floor(this.green).toString(16);
    return hex;
  };

  MovingObject.prototype.subtractGreen = function(value) {
    if (value > 0) {
      this.green -= 0.2;
    }
    var hex = Math.floor(this.green).toString(16);
    return hex;
  };

  MovingObject.prototype.drawExplosionShard = function (ctx) {
    var color = "#" + this.red + this.addGreen(this.green) + "0";
    ctx.beginPath();
    ctx.fillStyle = color;
    // ctx.fillStyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();
  };

  MovingObject.prototype.drawStar = function (ctx) {
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

      var x1 = this.pos[0], y1 = this.pos[1];
      var x2 = otherObject.pos[0], y2 = otherObject.pos[1];

      distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      if (distance <= this.radius + otherObject.radius) {
        return true;
      } else {
        return false;
      }
    }
  };

  MovingObject.prototype.explode = function(options) {
    var count = 0;
    var offset = options.offset;

    // for (var theta=0; theta < 2 * Math.PI; theta += .1) {
    //   var vel = Asteroids.Util.unitVector(theta + offset);
    //   this.game.explosionShards.push(new Asteroids.ExplosionShard({
    //     pos: options.pos.slice(),
    //     color: options.color,
    //     vel: [vel[0] * 3, vel[1] * 3],
    //     radius: options.radius,
    //     game: options.game,
    //   }));
    // }
    for (var i=0; i<300; i++) {
      var vel = Asteroids.Util.randomVec((Math.random() * 1) + 1);
      // var vel = Asteroids.Util.randomVec(Asteroids.ExplosionShard.prototype.VELOCITY[Math.floor(Math.random() * 3)]);
      this.game.explosionShards.push(new Asteroids.ExplosionShard({
        pos: options.pos.slice(),
        color: options.color,

        vel: [vel[0] * 3, vel[1] * 3],
        radius: options.radius,
        game: options.game,
      }));
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    if (this instanceof Asteroids.Asteroid && otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(this);
      var eA = new Asteroids.explodingAsteroid({
        game: this.game,
        pos: this.pos,
        radius: this.radius,
      });

      this.game.explodingAsteroids.push(eA);

      window.setTimeout(function() {
        this.game.remove(eA);
        eA.explode({
          pos: eA.pos,
          game: eA.game,
          color: "#C9002C",
          offset: 0,
          radius: 2.5,
        });
      }.bind(this), 1500);

      // window.setTimeout(function() {
      //   eA.explode({
      //     pos: eA.pos,
      //     game: eA.game,
      //     color: "#ffa700",
      //     offset: 0.05,
      //     radius: 1,
      //   });
      // }.bind(this), 1075);
      //
      // window.setTimeout(function() {
      //   eA.explode({
      //     pos: eA.pos,
      //     game: eA.game,
      //     color: "#e7b759",
      //     offset: 0,
      //     radius: 1,
      //   });
      // }.bind(this), 1100);

      // this.game.remove(otherObject); // removes bullet
    } else {

    };
  }


})();
