(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ship = Asteroids.Ship = function(options) {

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



})();