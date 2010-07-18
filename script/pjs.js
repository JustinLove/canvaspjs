new CGD.Module('script/pjs', function(m) {
  m.under('./cgd/', function(m) {
    m.require('./debug');
    m.require('./js');
    m.require('./draw');
  });

  m.require('./libpjs'); 
});
