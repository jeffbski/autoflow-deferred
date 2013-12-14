# autoflow-deferred

[![Build Status](https://secure.travis-ci.org/jeffbski/autoflow-deferred.png?branch=master)](http://travis-ci.org/jeffbski/autoflow-deferred)

autoflow-deferred is a plugin for autoflow, the flow control rules engine, which adds integration with jQuery-style Deferred promises

For more information on `autoflow` the lightweight flow control rules engine:  http://github.com/jeffbski/autoflow

## Goals

 - make it easy to use React defined functions, promise style and in this case with promises that are compatible with jQuery
 - if a autoflow defined flow function is called without a callback, then a Deferred promise is returned
 - if promises are passed in as input parameters, they will automatically be resolved before tasks are called

## Installing

    npm install autoflow-deferred

OR

Pull from github - http://github.com/jeffbski/autoflow-deferred


## Example

```javascript
var autoflow = require('autoflow-deferred'); // enable deferred promise integration, return autoflow
// autoflow.logEvents(); // to enable logging to stderr of flow and task events

function loadData(x, y, cb) {
  setTimeout(function () {
    cb(null, x * y);
  }, 10);
}

function loadUser(uid, cb) {
  setTimeout(function () {
    cb(null, uid + '_user');
  }, 10);
}

function render(user, data) {
  return user + data;
}


var fn = autoflow('myflow', 'a, b, uid, cb -> err, renderedOut',
  loadData, 'a, b, cb -> err, c',
  loadUser, 'uid, cb -> err, user',
  render, 'user, c -> renderedOut'
);


var promise = fn(2, 3, 'joe');  // calling without passing in cb
promise.then(function (renderedOut) {
  console.error('renderedOut:', renderedOut);
});
```


## License

 - [MIT license](http://github.com/jeffbski/autoflow-deferred/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/autoflow-deferred
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/autoflow-deferred/issues

- You may contact me at @jeffbski or through github at http://github.com/jeffbski
