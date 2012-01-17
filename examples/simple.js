'use strict';

/**
   calling react fn without cb, switches to promise style
*/

var react = require('react');
require('../'); // require('react-deferred'); // enable deferred promise integration
// require('react/lib/log-events').logEvents(react); // to enable stderr logging of events

// OR alternatively just
// var react = require('react-deferred');  // it passes through the react main fn

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

var fn = react('myflow', 'a, b, uid, cb -> err, renderedOut',
  loadData, 'a, b, cb -> err, c',
  loadUser, 'uid, cb -> err, user',
  render, 'user, c -> renderedOut'
);


var promise = fn(2, 3, 'joe');  // calling without passing in cb
promise.then(function (renderedOut) {
  console.error('renderedOut:', renderedOut);
});
