CGD.JS.require.within('script/pjs.js', function() {
  var r = CGD.JS.require;

  r.under('cgd', function() {
    r('debug.js');
    r('js.js');
  });

  r('libpjs.js'); 
});
