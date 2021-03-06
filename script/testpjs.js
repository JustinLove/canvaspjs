// Creative Commons Attribution-Share Alike 3.0 Unported Licence
// http://creativecommons.org/licenses/by-sa/3.0/

new CGD.Module('script/testpjs', function(m) {
  //m.enqueue('../../naked/script/njs');
  m.enqueue('./pjs');
  m.enqueue('./cgd/file');
  m.enqueue('./cgd/html');
});

CGD.main.enqueue("./script/testcases");

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

CGD.TEST.pjs.path = "~/files/programming/javascript/pjs/testcases/";
CGD.TEST.pjs.runCases = function() {
  var t = CGD.TEST.pjs;
  t.target = document.getElementById('target');
  t.target.width = 100;
  t.target.height = 100;
  if (CGD.browser) {
    CGD.JS.addEvent(t.target, 'click',
      function() {CGD.browser('CGD', window).browse();});
    t.manual = new CGD.PJS.CanvasRenderingContextPostscript(t.target);
  }
  CGD.OBJECT.forEach(t.cases, function(f, name) {
    CGD.DRAW.on('target', f, {origin: 'center'});
    CGD.DRAW.saveFile = t.path + name + 'png.png';
    CGD.DRAW.save('target');
    var ps = CGD.PJS.on('target', f, {origin: 'center'});
    CGD.FILE.saveString(ps, t.path + name + 'eps.eps');
  });
};

CGD.TEST.pjs.showCases = function() {
  var path = "testcases/";
  var t = CGD.TEST.pjs;
  var h = {div: {'div.case': []}};
  var x = h.div['div.case'];
  CGD.OBJECT.forEach(t.cases, function(f, name) {
    x.push({
      'img.eps': {_src: path + name + 'eps.png'},
      'img.png': {_src: path + name + 'png.png'}
    });
  });
  var html = CGD.HTML.from(h);
  document.getElementById('tests').innerHTML = html;
};

CGD.TEST.pjs.init = function() {
  if (!CGD.TEST.pjs.cases) {
    setTimeout(CGD.TEST.pjs.init, 10);
    return;
  }
  CGD.DEBUG.onload();
  CGD.DEBUG.on();
//  CGD.DEBUG.p('test');
  CGD.TEST.pjs();
  //CGD.TEST.pjs.runCases();
  //CGD.TEST.pjs.showCases();
};
