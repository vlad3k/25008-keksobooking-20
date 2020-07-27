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
    mapPins.forEach(function (pin) {
      pin.remove();
    });
  }

  window.map = {
    renderPins: renderPins,
    removePins: removePins,
  };
})();
