'use strict';

window.data = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_ADS = 8;
  var TITLES = ['Шикарная квартира 50 кв.м.', 'Уютная крвартира, дешево', 'Квартира с евроремонтом 48 кв.м.',
    'Дом в пригороде', 'Студия, 25 м², 5/12 эт.', 'Коттедж 150 кв.м.'];
  var PRICES = [25000, 17000, 15000, 23000, 21000, 19000, 45000, 38000, 50000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var NUMBER_ROOMS = [1, 3, 6, 4, 5, 2];
  var GUESTS = [3, 9, 5, 4, 8, 10];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = [
    'В продаже однокомнатная квартира с прекрасным видом на парк и Лахта центр! Просторная комната с удобной нишей, балкон, раздельный санузел. В квартире частично выполнен ремонт: стеклопакеты, линолеум, металлическая входная дверь. Хороший дом, чистый подъезд.',
    'Сдается 1-к квартира в ЖК «Летний» на Пулковском шоссе. Квартира сдаётся впервые. Площадь 38 кв м. Лоджия с остеклением до пола. Имеются все условия для комфортного проживания: два шкафа-купе и один полочный (много места для хранения вещей). Из техники: стиральная машина, холодильник, электрический чайник, телевизор, варочная панель, духовая печь, микроволновая печь, WiFi-роутер. Фильтр для очистки воды.',
    'Новый дом,шведский комплекс «Элланд», закрытая территория, 5 минут до метро! В квартире новый ремонт, вся необходимая техника. На длительный срок от собственника.'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  function generateOffer() {
    var locationX = window.utils.getRandomIntInclusive(PIN_WIDTH / 2, mapPins.clientWidth - PIN_WIDTH / 2);
    var locationY = window.utils.getRandomIntInclusive(130, 630);

    return {
      author: {
        avatar: 'img/avatars/user0' + window.utils.getRandomIntInclusive(1, NUMBER_ADS) + '.png',
      },
      offer: {
        title: window.utils.getRandomValueFromArray(TITLES),
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomValueFromArray(PRICES),
        type: window.utils.getRandomValueFromArray(TYPES),
        rooms: window.utils.getRandomValueFromArray(NUMBER_ROOMS),
        guests: window.utils.getRandomValueFromArray(GUESTS),
        checkin: window.utils.getRandomValueFromArray(CHECKINS),
        checkout: window.utils.getRandomValueFromArray(CHECKOUTS),
        features: window.utils.getRandomValueFromArray(FEATURES),
        description: window.utils.getRandomValueFromArray(DESCRIPTIONS),
        photos: window.utils.getRandomValueFromArray(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  function generateOffers() {
    var offers = [];
    for (var i = 0; i < NUMBER_ADS; i++) {
      var offer = generateOffer();
      offers.push(offer);
    }
    return offers;
  }


  return {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    map: map,
    mainPin: mainPin,
    mapPins: mapPins,
    generateOffers: generateOffers,
  };

})();
