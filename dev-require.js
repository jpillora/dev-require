var core = {};
var Module = require('module');
var path = require('path');
var assert = require('assert');
var oldRequire = null;

exports.deactivate = function() {
  assert(typeof oldRequire === 'function', 'dev-require not activated yet');
  Module.prototype.require = oldRequire;
  oldRequire = null;
};

exports.activate = function(configs) {
  assert(oldRequire === null, 'dev-require has already been activated');

  var config = configs[require('os').hostname()] || configs["*"];

  //no config for this machine, do nothing
  if(!config) return;

  if(typeof config.filter === 'function') {
    config.filters = [config.filter];
  } else if(!config.filters || !config.filters.length) {
    config.filters = [function(p) { return p; }];
  }

  if(typeof config.dir === 'string') {
    config.dirs = [config.dir];
  } else if(!config.dirs || !config.dirs.length) {
    throw new Error("config.dir[s] must be set");
  }

  oldRequire = Module.prototype.require;
  function newRequire(p) {

    if(/^[\.\/]/.test(p) || core[p])
      return oldRequire.call(this, p);
    
    for(var d = 0; d < config.dirs.length; d++) {
      var dir = config.dirs[d];
      for(var f = 0; f < config.filters.length; f++) {
        var filter = config.filters[f];
        p = filter(p);
        if(!p) continue;
        var l = path.join(dir, p);
        try {
          return oldRequire.call(this, l);
        } catch(err) {}
      }
    }
    return oldRequire.call(this, p);
  }
  newRequire.dev = true;
  Module.prototype.require = newRequire;
};

//fill core modules
[
  "assert",
  "buffer_ieee754",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "_debugger",
  "dgram",
  "dns",
  "domain",
  "events",
  "freelist",
  "fs",
  "http",
  "https",
  "_linklist",
  "module",
  "net",
  "os",
  "path",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "tty",
  "url",
  "util",
  "vm",
  "zlib"
].forEach(function(c) { core[c] = true; } );
