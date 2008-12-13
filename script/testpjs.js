// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

CGD.TEST = CGD.TEST || {};
CGD.TEST.pjs = function () {
  var t = arguments.callee;
  t.target = document.getElementById('target');
  t.target.width = 100;
  t.target.height = 100;
  CGD.JS.addEvent(t.target, 'click',
    function() {CGD.browser('CGD', window).browse();});
  t.context = new CGD.PJS.CanvasRenderingContextPostscript(t.target);
  CGD.DRAW.on('target', t.draw);
  CGD.DEBUG.p(CGD.PJS.on('target', t.draw));
};

CGD.TEST.pjs.draw = function(context) {
  context.save();
  context.beginPath();
  context.arc(0.5, 0.5, 0.5, 0, CGD.JS.RADIANS, CGD.ARC.CLOCKWISE);
  context.fillStyle = 'blue';
  context.fill();
  context.restore();
};

CGD.TEST.pjs.init = function() {
  CGD.DEBUG.onload();
  CGD.DEBUG.on();
  CGD.DEBUG.p('test');
  CGD.TEST.pjs();
};
