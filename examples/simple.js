'use strict';

/**
   calling autoflow fn without cb, switches to promise style
*/

var autoflow = require('../');  // require('autoflow-deferred'); // enable deferred promise integration
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
