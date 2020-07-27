'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  var filteredAds = [];

  function getAdById(id) {
    return filteredAds[id];
  }

  function activate() {
    filteredAds = window.getAdverts();
    mapFilters.addEventListener('change', window.debounce(handleChangeFilter));
  }

  function getTypeOfPrice(price) {
    if (price < window.constants.LOW_PRICE) {
      return 'low';
    } else if (price >= window.constants.LOW_PRICE && price < window.constants.HIGH_PRICE) {
      return 'middle';
    }
    return 'high';
  }

  function handleChangeFilter() {
    var housingType = mapFilters['housing-type'].value;
    var housingPrice = mapFilters['housing-price'].value;
    var housingRooms = mapFilters['housing-rooms'].value;
    var housingGuests = mapFilters['housing-guests'].value;
    var features = Array.from(mapFilters.querySelectorAll('input[type="checkbox"]:checked'));

    filteredAds = window.getAdverts().filter(function (ad) {
      return (
        (housingType === 'any' ? true : housingType === ad.offer.type) &&
        (housingRooms === 'any' ? true : +housingRooms === ad.offer.rooms) &&
        (housingGuests === 'any' ? true : +housingGuests === ad.offer.guests) &&
        (housingPrice === 'any' ? true : housingPrice === getTypeOfPrice(ad.offer.price)) &&
        (features.every(function (feature) {
          return ad.offer.features.includes(feature.value);
        }))
      );
    });
    renderAds();
  }

  function renderAds() {
    window.card.remove();
    window.map.removePins();
    var readyData = filteredAds.slice(0, window.constants.DATA_SIZE);
    var readyAds = window.map.renderPins(readyData);
    mapPins.appendChild(readyAds);
  }

  window.filters = {
    activate: activate,
    renderAds: renderAds,
    getAdById: getAdById,
  };
})();
