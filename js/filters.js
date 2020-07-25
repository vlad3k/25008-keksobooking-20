'use strict';

window.filters = (function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  var filteredAds = [];

  function getAdById(id) {
    return filteredAds[id];
  }

  function activateFilters() {
    filteredAds = window.main.getAdverts();
    mapFilters.addEventListener('change', handleChangeFilter);
  }

  function getTypeOfPrice(price) {
    if (price < LOW_PRICE) {
      return 'low';
    } else if (price >= LOW_PRICE && price < HIGH_PRICE) {
      return 'middle';
    } else {
      return 'high';
    }
  }

  function handleChangeFilter() {
    var housingType = mapFilters['housing-type'].value;
    var housingPrice = mapFilters['housing-price'].value;
    var housingRooms = mapFilters['housing-rooms'].value;
    var housingGuests = mapFilters['housing-guests'].value;
    var features = Array.from(mapFilters.querySelectorAll('input[type="checkbox"]:checked'));

    filteredAds = window.main.getAdverts().filter(function (ad) {
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
    renderFilteredAds();
  }

  function renderFilteredAds() {
    window.card.removeCard();
    window.map.removePins();
    var readyData = filteredAds.slice(0, window.constants.DATA_SIZE + 1);
    var readyAds = window.map.renderPins(readyData);
    mapPins.appendChild(readyAds);
  }

  return {
    activateFilters: activateFilters,
    renderFilteredAds: renderFilteredAds,
    getAdById: getAdById,
  };
})();
