'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content;

  function renderPin(data, id) {
    var clonePin = pinTemplate.cloneNode(true);
    var pinElement = clonePin.querySelector('.map__pin');
    var avatarElement = clonePin.querySelector('img');
    pinElement.dataset.number = id;
    pinElement.style.top = data.location.y - window.constants.PIN_HEIGHT + 'px';
    pinElement.style.left = data.location.x - window.constants.PIN_WIDTH / 2 + 'px';

    avatarElement.src = data.author.avatar;
    avatarElement.alt = data.offer.title;

    return clonePin;
  }

  function move(evt) {
    if (evt.button === 0) {
      mainPin.addEventListener('mousemove', onMouseMove);
      mainPin.addEventListener('mouseup', onMouseUp);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      console.log(startCoords.x, startCoords.y);

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      mainPin.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mouseup', onMouseUp);
    }
  }

  return {
    //pinPositionCenter: pinPositionCenter,
    //pinPositionPointer: pinPositionPointer,
    renderPin: renderPin,
    move: move,
  };
})();
