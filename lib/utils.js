(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function() {};

  Util.inherits = function (subClass, superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(length) {
    //generate random angle
    angle = Math.floor(Math.random() * 360);
    radians = angle * (Math.PI/180);

    x = Math.cos(radians) * length;
    y = Math.sin(radians) * length;

    return [x, y];
  };

  Asteroids.Util.getDistance = function(startPos, endPos) {
    var dx = endPos[0] - startPos[0];
    var dy = endPos[1] - startPos[1];

    return Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
  };

})();
