'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPin = mapElement.querySelector('.map__pin--main');
  var adverts = null;

  function getAdverts() {
    return adverts;
  }

  function onPageActivate(evt) {
    if ((evt.button === window.constants.MOUSE_LEFT_BUTTON ||
         evt.key === window.constants.KEY_ENTER) &&
         mapElement.classList.contains('map--faded')) {
      evt.preventDefault();
      window.form.activate();
      window.load.getData(function (ads) {
        adverts = ads;
        mapElement.classList.remove('map--faded');
        window.filters.activate();
        window.filters.renderAds();
      });
    }
    window.pin.move(evt);
  }

  function loadPage() {
    mainPin.addEventListener('mousedown', onPageActivate);
    mainPin.addEventListener('keydown', onPageActivate);
    mapElement.classList.add('map--faded');
    window.form.init();
  }

  loadPage();

  window.getAdverts = getAdverts;
})();
