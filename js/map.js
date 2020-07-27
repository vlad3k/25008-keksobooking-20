'use strict';

(function () {
  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.render(offers[i], i);
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

  window.map = {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
