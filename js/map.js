'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var ads = window.data.generateOffers();
  var pinsFragment = renderPins(ads);

  function renderPins(offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = window.pin.renderPin(offers[i]);
      fragment.appendChild(pin);
    }

    return fragment;
  }

  function activateMap() {
    map.classList.remove('map--faded');
    mapPins.appendChild(window.map.pinsFragment);
  }

  return {
    pinsFragment: pinsFragment,
    activateMap: activateMap,
  };
})();
