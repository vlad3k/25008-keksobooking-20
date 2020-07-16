'use strict';

window.map = (function () {

  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.renderPin(offers[i], i);
      fragment.appendChild(pin);
    }

    return fragment;
  }

  function removePins() {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].remove();
    }
  }

  return {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
