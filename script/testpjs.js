// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

CGD.TEST = CGD.TEST || {};
CGD.TEST.pjs = function () {
  var t = arguments.callee;
  CGD.PJS.hijack();
  t.target = document.getElementById('target');
  t.target.width = 100;
  t.target.height = 100;
  CGD.JS.addEvent(t.target, 'click',
    function() {CGD.browser('CGD', window).browse();});
  t.manual = new CGD.PJS.CanvasRenderingContextPostscript(t.target);
  t.get = t.target.getContext('cgd-postscript');
  CGD.DRAW.on('target', t.draw, {origin: 'center'});
  var ps = CGD.PJS.on('target', t.draw, {origin: 'center'});
  document.getElementById('output').innerHTML = ps;
};

CGD.TEST.pjs.draw = function(context) {
  context.save();
  context.rotate(CGD.JS.RADIANS*0.06);
  context.beginPath();
  context.moveTo(0, 0);
  context.arc(0, 0, 0.4, 0, CGD.JS.RADIANS*0.75, CGD.ARC.CLOCKWISE);
  context.closePath();
  context.fillStyle = 'blue';
  context.fill();
  context.lineWidth = 0.1;
  context.strokeStyle = 'green';
  context.stroke();
  context.restore();
};

CGD.TEST.pjs.init = function() {
  CGD.DEBUG.onload();
  CGD.DEBUG.on();
  CGD.DEBUG.p('test');
  CGD.TEST.pjs();
};
