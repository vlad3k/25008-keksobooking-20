'use strict';

function activatePage(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    evt.preventDefault();
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.mapFilters.classList.remove('map__filters--disabled');
    window.data.map.classList.remove('map--faded');
    window.data.mapPins.appendChild(window.map.pinsFragment);

    window.form.enableAllControls();
    window.form.addressField.value = window.map.pinPositionCenter;
    window.form.setValidationCapacity();
  }
}

function loadPage() {
  window.data.mainPin.addEventListener('mousedown', activatePage);
  window.data.mainPin.addEventListener('keydown', activatePage);
  window.form.adType.addEventListener('change', window.form.setPrice);
  window.form.adTimeIn.addEventListener('change', window.form.setTimeOut);
  window.form.adTimeOut.addEventListener('change', window.form.setTimeIn);
  window.form.adRoomNumber.addEventListener('change', window.form.setValidationCapacity);
  window.form.adCapacity.addEventListener('change', window.form.setValidationCapacity);

  window.data.map.classList.add('map--faded');
  window.form.adForm.classList.add('ad-form--disabled');
  window.form.addressField.setAttribute('readonly', 'true');

  window.form.disableAllControls();

  window.form.addressField.value = window.pin.pinPositionPointer;
  window.form.setPrice();
  window.form.setValidationCapacity();
}

loadPage();

