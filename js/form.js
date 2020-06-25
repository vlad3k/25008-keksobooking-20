'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var adType = adForm.querySelector('[name="type"]');
  var adPrice = adForm.querySelector('[name="price"]');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFilterFieldsets = mapFilters.querySelectorAll('fieldset');

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

  function disableAllControls() {
    disableControls(adFormFieldsets);
    disableControls(mapFiltersSelects);
    disableControls(mapFilterFieldsets);
  }

  function enableAllControls() {
    enableControls(adFormFieldsets);
    enableControls(mapFiltersSelects);
    enableControls(mapFilterFieldsets);
  }

  return {
    adForm: adForm,
    adType: adType,
    adTimeIn: adTimeIn,
    adTimeOut: adTimeOut,
    adRoomNumber: adRoomNumber,
    adCapacity: adCapacity,
    mapFilters: mapFilters,
    addressField: addressField,
    adFormFieldsets: adFormFieldsets,
    enableAllControls: enableAllControls,
    disableAllControls: disableAllControls,
    setValidationCapacity: setValidationCapacity,
    setTimeOut: setTimeOut,
    setTimeIn: setTimeIn,
    setPrice: setPrice,
  };
})();
