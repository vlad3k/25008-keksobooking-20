'use strict';

window.filters = (function () {
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
  function handleChangeFilter(evt) {
    var filterName = evt.target.value;
    var filterProp = evt.target.id.replace('housing-', '');
    filterData(filterName, filterProp);
    renderFilteredAds(filteredAds);
  }

  function filterData(name, prop) {
    filteredAds = window.main.getAdverts().filter(function (ad) {
      return name === 'any' ? true : ad.offer[prop] === name;
    });
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
