// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

CGD.JS.require('script/testcases.js');

CGD.TEST = CGD.TEST || {};
CGD.TEST.pjs = function () {
  var t = arguments.callee;
  CGD.PJS.hijack();
  t.target = document.getElementById('target');
  t.target.width = 100;
  t.target.height = 100;
  if (CGD.browser) {
    CGD.JS.addEvent(t.target, 'click',
      function() {CGD.browser('CGD', window).browse();});
    t.manual = new CGD.PJS.CanvasRenderingContextPostscript(t.target);
    t.get = t.target.getContext('cgd-postscript');
  }
  CGD.DRAW.on('target', t.cases.composite, {origin: 'center'});
  //CGD.DRAW.saveFile = CGD.DRAW.saveFile || CGD.STRING.serial("~/Desktop/screen000.png");
  //CGD.DRAW.saveFile = "~/Desktop/pjs.png";
  //CGD.DRAW.save('target');
  var ps = CGD.PJS.on('target', t.cases.composite, {origin: 'center'});
  document.getElementById('output').innerHTML = ps;
  //CGD.FILE.saveString(ps, "~/Desktop/pjs.eps");
};

CGD.TEST.pjs.init = function() {
  CGD.DEBUG.onload();
  CGD.DEBUG.on();
//  CGD.DEBUG.p('test');
  CGD.TEST.pjs();
};
