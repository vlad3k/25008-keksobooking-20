'use strict';

window.constants = (function () {
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

  return {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    NUMBER_ADS: NUMBER_ADS,
    TITLES: TITLES,
    PRICES: PRICES,
    TYPES: TYPES,
    NUMBER_ROOMS: NUMBER_ROOMS,
    GUESTS: GUESTS,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
  };
})();
