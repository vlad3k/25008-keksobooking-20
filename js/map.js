'use strict';

window.map = (function () {
  var pinsFragment = renderPins();

  function renderPins() {
    var offers = window.data.generateOffers();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.renderPin(offers[i]);
      fragment.appendChild(pin);
    }

    return fragment;
  }

  return {
    pinsFragment: pinsFragment,
  };
})();
