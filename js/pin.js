'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapElement = document.querySelector('.map');
  var mainPin = mapElement.querySelector('.map__pin--main');
  var mapOverlay = mapElement.querySelector('.map__overlay');

  var mainPinWidth = mainPin.clientWidth;
  var mainPinHeight = mainPin.clientHeight;
  var mainPinPointerHeight = window.utils.getStylePropertyLikeNumber(mainPin, 'height', ':after');
  var initialPosMainPointer = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };
  var mainPointerOffsets = {
    offsetX: mainPinWidth / 2,
    offsetY: mainPinHeight + mainPinPointerHeight
  };
  var areaPointerLimits = {
    TOP: 130,
    BOTTOM: 630,
    left: 0,
    right: mapOverlay.offsetWidth
  };

  function resetMainPinPos() {
    mainPin.style.left = initialPosMainPointer.x + 'px';
    mainPin.style.top = initialPosMainPointer.y + 'px';
  }

  function getPositionMainPointer(coords) {
    return {
      x: coords.x - mainPointerOffsets.offsetX,
      y: coords.y - mainPointerOffsets.offsetY,
    };
  }

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
    evt.preventDefault();
    if (evt.button === 0) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
    }

    var currentPointerCoords = {
      x: mainPin.offsetLeft + mainPointerOffsets.offsetX,
      y: mainPin.offsetTop + mainPointerOffsets.offsetY,
    };

    var positionMainPointer = getPositionMainPointer(currentPointerCoords);

    window.form.setAddress(currentPointerCoords.x, currentPointerCoords.y);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      if (!mapElement.classList.contains('map--faded')) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        currentPointerCoords = {
          x: mainPin.offsetLeft + mainPointerOffsets.offsetX,
          y: mainPin.offsetTop + mainPointerOffsets.offsetY,
        };

        if (currentPointerCoords.y < areaPointerLimits.TOP) {
          currentPointerCoords.y = areaPointerLimits.TOP;
        }
        if (currentPointerCoords.y > areaPointerLimits.BOTTOM) {
          currentPointerCoords.y = areaPointerLimits.BOTTOM;
        }

        if (currentPointerCoords.x < areaPointerLimits.left) {
          currentPointerCoords.x = areaPointerLimits.left;
        }
        if (currentPointerCoords.x > areaPointerLimits.right) {
          currentPointerCoords.x = areaPointerLimits.right;
        }

        positionMainPointer = getPositionMainPointer(currentPointerCoords);

        mainPin.style.left = (positionMainPointer.x - shift.x) + 'px';
        mainPin.style.top = (positionMainPointer.y - shift.y) + 'px';

        window.form.setAddress(currentPointerCoords.x, currentPointerCoords.y);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(currentPointerCoords.x, currentPointerCoords.y);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  return {
    renderPin: renderPin,
    resetMainPinPos: resetMainPinPos,
    move: move,
  };
})();
