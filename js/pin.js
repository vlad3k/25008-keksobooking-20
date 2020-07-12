'use strict';

window.pin = (function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosLeft = window.utils.getStylePropertyLikeNumber(mainPin, 'left');
  var mainPinPosTop = window.utils.getStylePropertyLikeNumber(mainPin, 'top');
  var mainPinWidth = mainPin.clientWidth;
  var mainPinHeight = mainPin.clientHeight;
  var mainPinPointer = window.utils.getStylePropertyLikeNumber(mainPin, 'height', ':after');

  var pinPositionCenter = (mainPinPosLeft + mainPinWidth / 2) + ', ' + (mainPinPosTop + mainPinHeight + mainPinPointer);
  var pinPositionPointer = (mainPinPosLeft + mainPinWidth / 2) + ', ' + (mainPinPosTop + mainPinHeight / 2);
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

  return {
    pinPositionCenter: pinPositionCenter,
    pinPositionPointer: pinPositionPointer,
    renderPin: renderPin,
  };
})();
