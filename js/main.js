'use strict';
var mapElement = document.querySelector('.map');
var mainPin = mapElement.querySelector('.map__pin--main');
var mapPins = mapElement.querySelector('.map__pins');

function activatePage(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    evt.preventDefault();
    window.form.activateForm();
    window.load.getData(function (ads) {
      var pinsFragment = window.map.renderPins(ads);
      mapElement.classList.remove('map--faded');
      mapPins.appendChild(pinsFragment);
      window.card.renderCard(ads[6]);
    });
  }
}

function loadPage() {
  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
  mapElement.classList.add('map--faded');
  window.form.initForm();
}

loadPage();

