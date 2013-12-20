
//patch require to look in ../
//BEFORE looking in node_modules
require('../../dev-require').activate({
  'iJamoProR.local': {
    dir: __dirname + "/.."
  }
});

//retrieves local 'foo-module'
var foo = require('foo-module');

console.log(42 + foo); //=> 49
