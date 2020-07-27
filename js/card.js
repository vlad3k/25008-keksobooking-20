'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPins = map.querySelector('.map__pins');

  function handlePopupEsc(evt) {
    if (evt.key === 'Escape') {
      removeCard();
      document.removeEventListener('keydown', handlePopupEsc);
    }
  }

  function renderCard(add) {
    var typeOfHouse = {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец',
    };
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
    var featuresElement = cloneCard.querySelector('.popup__features');
    var iconClose = cloneCard.querySelector('.popup__close');

    if (!add || !add.offer) {
      return;
    }

    if (add.offer.title) {
      titleElement.textContent = add.offer.title;
    } else {
      titleElement.remove();
    }

    if (add.offer.address) {
      addressElement.textContent = add.offer.address;
    } else {
      addressElement.remove();
    }

    if (add.offer.price) {
      priceElement.textContent = add.offer.price + '₽/ночь';
    } else {
      priceElement.remove();
    }

    if (add.offer.type) {
      typeElement.textContent = typeOfHouse[add.offer.type.toUpperCase()];
    } else {
      typeElement.remove();
    }

    if (add.offer.rooms && add.offer.guests) {
      capacityElement.textContent = add.offer.rooms + ' комнаты для ' + add.offer.guests + ' гостей';
    } else {
      capacityElement.remove();
    }

    if (add.offer.checkin && add.offer.checkout) {
      timestampsElement.textContent = 'Заезд после ' + add.offer.checkin + ', выезд до ' + add.offer.checkout;
    } else {
      timestampsElement.remove();
    }

    if (add.offer.description) {
      descriptionElement.textContent = add.offer.description;
    } else {
      descriptionElement.remove();
    }

    if (add.author.avatar) {
      avatarElement.src = add.author.avatar;
    } else {
      avatarElement.remove();
    }

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
      for (var j = 0; j < add.offer.features.length; j++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature', 'popup__feature--' + add.offer.features[j]);
        li.textContent = add.offer.features[j];
        featuresFragment.appendChild(li);
        featuresElement.appendChild(featuresFragment);
      }
    } else {
      featuresElement.remove();
    }

    iconClose.addEventListener('click', removeCard);

    document.addEventListener('keydown', handlePopupEsc);

    map.insertBefore(cloneCard, mapFiltersContainer);
  }

  function removeCard() {
    if (map.querySelector('.map__card.popup')) {
      map.querySelector('.map__card.popup').remove();
      document.removeEventListener('keydown', handlePopupEsc);
    }
  }

  function handleOpenCard(evt) {
    var btn = evt.target.closest('.map__pin:not(.map__pin--main)');
    deactivePins();

    if (btn) {
      btn.classList.add('map__pin--active');
      var add = window.filters.getAdById(btn.dataset.number);
      removeCard();
      renderCard(add);
    }
  }

  function deactivePins() {
    var activePins = mapPins.querySelectorAll('.map__pin--active');
    if (activePins) {
      activePins.forEach(function (el) {
        console.log(el);
        el.classList.remove('map__pin--active');
      })
    }
  }

  mapPins.addEventListener('click', handleOpenCard);
  mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      handleOpenCard(evt);
    }
  });

  return {
    removeCard: removeCard,
  };

})();
