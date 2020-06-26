'use strict';

window.data = (function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  function generateOffer() {
    var locationX = window.utils.getRandomIntInclusive(window.constants.PIN_WIDTH / 2, mapPins.clientWidth - window.constants.PIN_WIDTH / 2);
    var locationY = window.utils.getRandomIntInclusive(130, 630);

    return {
      author: {
        avatar: 'img/avatars/user0' + window.utils.getRandomIntInclusive(1, window.constants.NUMBER_ADS) + '.png',
      },
      offer: {
        title: window.utils.getRandomValueFromArray(window.constants.TITLES),
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomValueFromArray(window.constants.PRICES),
        type: window.utils.getRandomValueFromArray(window.constants.TYPES),
        rooms: window.utils.getRandomValueFromArray(window.constants.NUMBER_ROOMS),
        guests: window.utils.getRandomValueFromArray(window.constants.GUESTS),
        checkin: window.utils.getRandomValueFromArray(window.constants.CHECKINS),
        checkout: window.utils.getRandomValueFromArray(window.constants.CHECKOUTS),
        features: window.utils.getRandomValueFromArray(window.constants.FEATURES),
        description: window.utils.getRandomValueFromArray(window.constants.DESCRIPTIONS),
        photos: window.utils.getRandomValueFromArray(window.constants.PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  function generateOffers() {
    var offers = [];
    for (var i = 0; i < window.constants.NUMBER_ADS; i++) {
      var offer = generateOffer();
      offers.push(offer);
    }
    return offers;
  }


  return {
    generateOffers: generateOffers,
  };

})();
