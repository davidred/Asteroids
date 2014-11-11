(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    window.setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);

  };

  GameView.prototype.bindKeyHandlers = function() {
    ship = this.game.ship;
    // key('w, up', function() { ship.power(1); });
    // key('s, down', function() { ship.power(-1); });
    // key('a, left', function() { ship.rotate(-.1); });
    // key('d, right', function() { ship.rotate(.1); });
    // key('space', function() { ship.fireBullet(); });
  };

})();
