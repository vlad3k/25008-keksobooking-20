'use strict';

window.main = (function () {
  var mapElement = document.querySelector('.map');
  var mainPin = mapElement.querySelector('.map__pin--main');
  var adverts = null;

  function getAdverts() {
    return adverts;
  }

  function activatePage(evt) {
    if ((evt.button === 0 || evt.key === 'Enter') && mapElement.classList.contains('map--faded')) {
      evt.preventDefault();
      window.form.activateForm();
      window.load.getData(function (ads) {
        adverts = ads;
        mapElement.classList.remove('map--faded');
        window.filters.activateFilters();
        window.filters.renderFilteredAds();
      });
    }
    window.pin.move(evt);
  }

  function loadPage() {
    mainPin.addEventListener('mousedown', activatePage);
    mainPin.addEventListener('keydown', activatePage);
    mapElement.classList.add('map--faded');
    window.form.initForm();
  }

  loadPage();

  return {
    getAdverts: getAdverts,
  };
})();
