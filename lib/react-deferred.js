'use strict';
/*jshint white: false */

var Deferred = require('Deferred');

var OUTPUT_STYLE_DEFERRED_PROMISE = 'Deferred.promise';

var react = require('react');
react.resolvePromises(); // turn on automatic promise resolution

react.events.on(react.events.TYPES.EXEC_INPUT_PREPROCESS, function (parsedInput) {
  var options = parsedInput.options;
  var args = parsedInput.args;
  var cb = parsedInput.cb;
  var extraArgs = parsedInput.extraArgs;

  // no callback function provided, use promise when creating outTask
  if (options.outputStyle === 'cb' && typeof(cb) !== 'function') {
      parsedInput.options.outputStyle = OUTPUT_STYLE_DEFERRED_PROMISE;
  }
});



react.events.on(react.events.TYPES.EXEC_OUTTASK_CREATE, function (outTaskOptions) {
  var execOptions = outTaskOptions.execOptions;
  if (execOptions && execOptions.outputStyle === OUTPUT_STYLE_DEFERRED_PROMISE) {
    var deferred = new Deferred();
    outTaskOptions.cbFunc = function (err, value) {
      if (err) return deferred.reject(err);
      deferred.resolve(value);
    };
    outTaskOptions.retValue = deferred.promise();
  }  
});
               

module.exports = react;