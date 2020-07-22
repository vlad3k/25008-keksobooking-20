'use strict';

window.filters = (function () {
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  var filteredAds = [];

  function activateFilters() {

    mapFilters.addEventListener('change', function (evt) {
      var filterName = evt.target.value;
      var filterProp = evt.target.id.replace('housing-', '');
      filteredAds = window.main.getAdverts().filter(function (ad) {
        if (filterName === 'any') {
          return true;
        }
        return ad.offer[filterProp] === filterName;
      });

      window.card.removeCard();
      window.map.removePins();
      mapPins.appendChild(window.map.renderPins(filteredAds));
    });
  }

  return {
    activateFilters: activateFilters,
  };
})();
