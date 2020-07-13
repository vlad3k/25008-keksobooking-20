'use strict';

window.map = (function () {
  var ads = null;

  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.renderPin(offers[i], i);
      fragment.appendChild(pin);
    }

    return fragment;
  }


  return {
    ads: ads,
    renderPins: renderPins,
  };
})();
