(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
		this.bindKeyHandlers();
  };

  GameView.prototype.start = function () {
    window.setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);
  };
	
	GameView.prototype.bindKeyHandlers = function () {
		var ship = this.game.ship;
		key('up', 		function() 	{ ship.power([0, -1])});
		key('left', 	function() 	{ ship.power([-1, 0])});
		key('down', 	function() 	{ ship.power([0,  1])});
		key('right', 	function()  { ship.power([1,  0])});
		
		key('f',      function()  { ship.fireBullet()    });
	};


})();