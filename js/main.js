'use strict';
var mapElement = document.querySelector('.map');
var mainPin = mapElement.querySelector('.map__pin--main');
var mapPins = mapElement.querySelector('.map__pins');

function activatePage(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    evt.preventDefault();
    var ads = window.data.generateOffers();
    var pinsFragment = window.map.renderPins(ads);

    window.form.activateForm();
    mapElement.classList.remove('map--faded');
    mapPins.appendChild(pinsFragment);
  }
}

function loadPage() {
  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
  mapElement.classList.add('map--faded');
  window.form.initForm();
}

loadPage();

