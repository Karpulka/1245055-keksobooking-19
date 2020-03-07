'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callbackFunction) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callbackFunction.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
