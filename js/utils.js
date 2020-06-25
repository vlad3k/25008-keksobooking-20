'use strict';

window.utils = (function () {
  function getStylePropertyLikeNumber(element, property, pseudo) {
    return +getComputedStyle(element, pseudo ? pseudo : null)[property].replace('px', '');
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomValueFromArray(arr) {
    var randomId = Math.floor(Math.random() * arr.length);
    return arr[randomId];
  }

  return {
    getStylePropertyLikeNumber: getStylePropertyLikeNumber,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomValueFromArray: getRandomValueFromArray,
  };
})();
