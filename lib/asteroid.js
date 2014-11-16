(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    this.image =  Math.floor(Math.random() * 6)
    options.color = this.COLOR[Math.floor(Math.random() * 5)];
    options.radius = this.RADIUS * Math.random() + 15;
    options.vel = Asteroids.Util.randomVec(Math.random() * 4);
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.COLOR = ["#304f87", "#7d1935", "#7828ac", "#649987", "#bfacc0"];
  Asteroid.prototype.RADIUS = 15;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
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
          radius: 2,
        });
      }.bind(this), 1000);

      window.setTimeout(function() {
        eA.explode({
          pos: eA.pos,
          game: eA.game,
          color: "#e7b759",
          offset: 0.1,
          radius: 1,
        });
      }.bind(this), 1100);

      // this.game.remove(otherObject); // removes bullet
    }

  };

})();
