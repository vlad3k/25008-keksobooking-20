'use strict';

window.map = (function () {
  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.renderPin(offers[i]);
      fragment.appendChild(pin);
    }

    return fragment;
  }

  return {
    renderPins: renderPins,
  };
})();
