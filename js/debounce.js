
'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  return {
    debounce: debounce
  };
})();
