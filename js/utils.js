'use strict';

(function () {
  function getStylePropertyLikeNumber(element, property, pseudo) {
    return +getComputedStyle(element, pseudo ? pseudo : null)[property].replace('px', '');
  }

  window.utils = {
    getStylePropertyLikeNumber: getStylePropertyLikeNumber,
  };
})();
