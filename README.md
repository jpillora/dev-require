dev-require
===========

Patch require to load local modules during development.
Allowing you to create a series of dependent modules and work on them
all without `npm publish` and `npm install`ing all the time. 

### Install

```
npm install --save-dev dev-require
```

### Quick Usage

Given directory:
```
projects-directory/
├── bar-module
│   └── index.js
└── foo-module
    └── index.js
```

Given file `projects-directory/bar-module/index.js`:

``` js
//Patch require to look in 'projects-directory/'
//BEFORE looking in node_modules
require('dev-require').activate({
  'iJamoProR.local': {
    dir: __dirname + "/.."
  }
});

//retrieves local 'foo-module'
var foo = require('foo-module');

console.log(42 + foo); //=> 49
```

### API

#### `activate(config)`

Activates development `require`

`config`.`[hostname]` - configuration for `hostname` that matches `require('os').hostname()`. `"*"` can be used to match all hostnames.
`config`.`[hostname]`.`dir` - a directory to search
`config`.`[hostname]`.`dirs` - an array of directories to search
`config`.`[hostname]`.`filter` - pass the module name through a `filter` function before attempting the `require`
`config`.`[hostname]`.`filters` - an array `filter` functions

**Note:** The first `directory+filter(module)` combination to successfully return a module will be used. If none match, `require` will run as normal.

#### `deactivate()`

Deactivates development `require`

#### MIT License

Copyright © 2013 Jaime Pillora &lt;dev@jpillora.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



