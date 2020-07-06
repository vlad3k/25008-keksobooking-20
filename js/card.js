'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var typesOfHouse = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  function renderCard(add) {
    var photosFragment = document.createDocumentFragment();
    var featuresFragment = document.createDocumentFragment();
    var cloneCard = cardTemplate.cloneNode(true);
    var titleElement = cloneCard.querySelector('.popup__title');
    var addressElement = cloneCard.querySelector('.popup__text--address');
    var priceElement = cloneCard.querySelector('.popup__text--price');
    var typeElement = cloneCard.querySelector('.popup__type');
    var capacityElement = cloneCard.querySelector('.popup__text--capacity');
    var timestampsElement = cloneCard.querySelector('.popup__text--time');
    var descriptionElement = cloneCard.querySelector('.popup__description');
    var avatarElement = cloneCard.querySelector('.popup__avatar');
    var photosElement = cloneCard.querySelector('.popup__photos');
    var featuresElement = cloneCard.querySelector('.popup__features ');

    add.offer.title ? titleElement.textContent = add.offer.title : titleElement.remove();
    add.offer.address ? addressElement.textContent = add.offer.address : addressElement.remove();
    add.offer.price ? priceElement.textContent = add.offer.price + '₽/ночь' : priceElement.remove();
    add.offer.type ? typeElement.textContent =  typesOfHouse[add.offer.type] : typeElement.remove();
    add.offer.capacity ? capacityElement.textContent =
      add.offer.rooms + ' комнаты для ' + add.offer.guests + ' гостей' : capacityElement.remove();
    add.offer.checkin ? timestampsElement.textContent =
      'Заезд после ' + add.offer.checkin + ', выезд до ' + add.offer.checkout : timestampsElement.remove();
    add.offer.description ? descriptionElement.textContent = add.offer.description : descriptionElement.remove();
    add.author.avatar ? avatarElement.src = add.author.avatar : avatarElement.remove();

    if (add.offer.photos) {
      photosElement.innerHTML = '';
      for (var i = 0; i < add.offer.photos.length; i++) {
        var img = document.createElement('img');
        img.src = add.offer.photos[i];
        img.classList.add('popup__photo');
        img.width = window.constants.PHOTO_WIDTH;
        img.height = window.constants.PHOTO_HEIGHT;
        photosFragment.appendChild(img);
      }
      photosElement.appendChild(photosFragment);
    } else {
      photosElement.remove();
    }

    if (add.offer.features) {
      featuresElement.innerHTML = '';
      for (var i = 0; i < add.offer.features.length; i++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature', 'popup__feature--' + add.offer.features[i]);
        li.textContent = add.offer.features[i];
        featuresFragment.appendChild(li);
        featuresElement.appendChild(featuresFragment);
      }
    } else {
      featuresElement.remove();
    }

    map.insertBefore(cloneCard, mapFiltersContainer);
  }

  return {
    renderCard: renderCard,
  }
})();
