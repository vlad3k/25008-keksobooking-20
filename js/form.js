'use strict';

(function () {
  var PRICE_LIMITATIONS = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adType = adForm.querySelector('[name="type"]');
  var adPrice = adForm.querySelector('[name="price"]');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var mapFilters = mapElement.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFilterFieldsets = mapFilters.querySelectorAll('fieldset');
  var mainPin = mapElement.querySelector('.map__pin--main');
  var mainPinDefaultX = mainPin.offsetLeft;
  var mainPinDefaultY = mainPin.offsetTop;
  var mainPinWidth = mainPin.clientWidth;
  var mainPinHeight = mainPin.clientHeight;

  function setPrice() {
    adPrice.min = PRICE_LIMITATIONS[adType.value];
    adPrice.placeholder = PRICE_LIMITATIONS[adType.value];
  }

  function setTimeIn() {
    adTimeIn.value = adTimeOut.value;
  }

  function setTimeOut() {
    adTimeOut.value = adTimeIn.value;
  }

  function setAddress(x, y) {
    addressField.value = Math.round(x) + ', ' + Math.round(y);
  }

  function setValidationCapacity() {
    var rooms = parseInt(adRoomNumber.value, 10);
    var places = parseInt(adCapacity.value, 10);

    if (rooms < places) {
      adCapacity.setCustomValidity('Мест не может быть больше чем количество комнат');
      return;
    }
    if (rooms === 100 && places !== 0) {
      adCapacity.setCustomValidity('Помещение с таким количеством комнат не для гостей');
      return;
    }
    if (rooms < 100 && places === 0) {
      adCapacity.setCustomValidity('Выбранное количество комнат предполагает минимум одно место');
      return;
    }
    adCapacity.setCustomValidity('');
  }

  function enableControls(elements) {
    elements.forEach(function (el) {
      el.disabled = false;
    });
  }

  function disableControls(elements) {
    elements.forEach(function (el) {
      el.disabled = true;
    });
  }

  function activate() {
    enableControls(adFormFieldsets);
    enableControls(mapFiltersSelects);
    enableControls(mapFilterFieldsets);
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    setValidationCapacity();
  }

  function init() {
    disableControls(adFormFieldsets);
    disableControls(mapFiltersSelects);
    disableControls(mapFilterFieldsets);
    adType.addEventListener('change', setPrice);
    adTimeIn.addEventListener('change', setTimeOut);
    adTimeOut.addEventListener('change', setTimeIn);
    adRoomNumber.addEventListener('change', setValidationCapacity);
    adCapacity.addEventListener('change', setValidationCapacity);
    adForm.classList.add('ad-form--disabled');
    addressField.setAttribute('readonly', 'true');
    setAddress(mainPin.offsetLeft + mainPinWidth / 2, mainPin.offsetTop + mainPinHeight / 2);
    setPrice();
    setValidationCapacity();
    window.card.remove();
  }

  function handleResetFormPage() {
    window.map.removePins();
    mapElement.classList.add('map--faded');
    mapFilters.reset();
    setAddress(mainPinDefaultX, mainPinDefaultY);
    init();
    window.pin.resetMainPinPos();
  }

  adForm.addEventListener('submit', function (evt) {
    window.load.sendData(
        new FormData(adForm),
        function () {
          mapElement.classList.add('map--faded');
          window.modal.renderSuccess();
          window.map.removePins();
          adForm.reset();
          init();
          window.pin.resetMainPinPos();
        },
        window.modal.renderError);
    evt.preventDefault();
  });

  adForm.addEventListener('reset', handleResetFormPage);

  window.form = {
    setAddress: setAddress,
    activate: activate,
    init: init,
  };
})();
