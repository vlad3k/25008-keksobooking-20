'use strict';
var mapElement = document.querySelector('.map');
var mainPin = mapElement.querySelector('.map__pin--main');

function activatePage(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    evt.preventDefault();
    window.form.activateForm();
    window.map.activateMap();
  }
}

function loadPage() {
  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
  mapElement.classList.add('map--faded');
  window.form.initForm();
}

loadPage();

