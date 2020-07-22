'use strict';

window.form = (function () {
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
    var minPrice;
    switch (adType.value) {
      case 'bungalo':
        minPrice = 0;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
      default:
        minPrice = 1000;
    }
    adPrice.min = minPrice;
    adPrice.placeholder = minPrice;
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
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
    }
  }

  function disableControls(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
  }

  function activateForm() {
    enableControls(adFormFieldsets);
    enableControls(mapFiltersSelects);
    enableControls(mapFilterFieldsets);
    window.filters.activateFilters();
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    setValidationCapacity();
  }

  function initForm() {
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
    window.card.removeCard();
  }

  function handleResetFormPage(evt) {
    window.map.removePins();
    mapElement.classList.add('map--faded');
    mapFilters.reset();
    adForm.reset();
    setAddress(mainPinDefaultX, mainPinDefaultY);
    initForm();
    window.pin.resetMainPinPos();
    evt.preventDefault();
  }

  adForm.addEventListener('submit', function (evt) {
    window.load.sendData(
        new FormData(adForm),
        function () {
          mapElement.classList.add('map--faded');
          window.modal.renderSuccessModal();
          window.map.removePins();
          adForm.reset();
          initForm();
          window.pin.resetMainPinPos();
        },
        window.modal.renderErrorModal);
    evt.preventDefault();
  });

  adForm.addEventListener('reset', handleResetFormPage);

  return {
    setAddress: setAddress,
    activateForm: activateForm,
    initForm: initForm,
  };
})();
