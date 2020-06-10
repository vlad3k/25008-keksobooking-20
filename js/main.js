'use strict';

var NUMBER_ADS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
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

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValueFromArray(arr) {
  var randomId = Math.floor(Math.random() * arr.length);
  return arr[randomId];
}

function generateOffer() {
  var locationX = getRandomIntInclusive(PIN_WIDTH / 2, mapPins.clientWidth - PIN_WIDTH / 2);
  var locationY = getRandomIntInclusive(130, 630);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(1, NUMBER_ADS) + '.png',
    },
    offer: {
      title: getRandomValueFromArray(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomValueFromArray(PRICES),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomValueFromArray(NUMBER_ROOMS),
      guests: getRandomValueFromArray(GUESTS),
      checkin: getRandomValueFromArray(CHECKINS),
      checkout: getRandomValueFromArray(CHECKOUTS),
      features: getRandomValueFromArray(FEATURES),
      description: getRandomValueFromArray(DESCRIPTIONS),
      photos: getRandomValueFromArray(PHOTOS),
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

function renderPin(data) {
  var clonePin = pinTemplate.cloneNode(true);

  var pinElement = clonePin.querySelector('.map__pin');
  var avatarElement = clonePin.querySelector('img');

  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';
  pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';

  avatarElement.src = data.author.avatar;
  avatarElement.alt = data.offer.title;

  return clonePin;
}

function renderPins() {
  var offers = generateOffers();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var pin = renderPin(offers[i]);
    fragment.appendChild(pin);
  }

  mapPins.appendChild(fragment);

  document.querySelector('.map').classList.remove('map--faded');
}

renderPins();
