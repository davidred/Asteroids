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

})();
