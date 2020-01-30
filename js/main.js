'use strict';

var ADVERT_ARRAY_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_TITLE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var GUESTS_IN_ROOM = 2;
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsList = document.querySelector('.map__pins');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

function LocationCoordinates(x, y, offset) {
  if (!offset) {
    offset = 0;
  }
  x += offset;
  y += offset;
  return {x: x, y: y};
}

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
};

var makeAdvert = function (idx) {
  var roomsCount = getRandomValue(1, 5);
  var location = new LocationCoordinates(600, 350);
  var offsetX = getRandomValue(-400, 400);
  var offsetY = getRandomValue(-200, 200);
  var featuresLength = getRandomValue(0, FEATURES.length - 1);
  var photosStartDelete = getRandomValue(0, PHOTOS.length - 1);
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + idx + '.png'
    },
    offer: {
      title: 'Апартаменты ' + idx,
      address: location.x + ', ' + location.y,
      price: getRandomValue(10000, 35000),
      type: getRandomItemFromArray(TYPES),
      rooms: roomsCount,
      guests: roomsCount * GUESTS_IN_ROOM,
      checkin: getRandomItemFromArray(CHECK_TIMES),
      checkout: getRandomItemFromArray(CHECK_TIMES),
      features: FEATURES.slice().splice(featuresLength),
      description: 'А здесь мы пишем описание квартирки №' + idx,
      photos: PHOTOS.slice().splice(photosStartDelete),
      location: {
        x: location.x + offsetX,
        y: location.y + offsetY
      }
    }
  };
  return obj;
};

var getAdverts = function (count) {
  var adverts = [];
  for (var i = 1; i < count + 1; i++) {
    var obj = makeAdvert(i);
    adverts.push(obj);
  }
  return adverts;
};

var renderMapPin = function (advert) {
  var advertElement = mapPinTemplate.cloneNode(true);
  var pin = advertElement.querySelector('img');
  var locationX = advert.offer.location.x + Math.ceil(pin.style.width / 2);
  var locationY = advert.offer.location.y + Math.ceil(pin.style.height / 2);
  advertElement.style.left = locationX + 'px';
  advertElement.style.top = locationY + 'px';
  pin.src = advert.author.avatar;
  pin.alt = advert.offer.title;
  return advertElement;
};

var showListItemsByClass = function (listItems, itemClassStart, classIndicators) {
  listItems.forEach(function (listItem) {
    listItem.style.display = 'none';
  });
  classIndicators.forEach(function (item) {
    listItems.forEach(function (listItem) {
      if (listItem.classList.contains(itemClassStart + item)) {
        listItem.style.display = 'inline-block';
      }
    });
  });
};

var renderCardPhotos = function (cardElement, cardPhotos, cardPhotosParentBlock) {
  if (cardPhotos.length > 0) {
    cardPhotos.forEach(function (photo, i) {
      if (i === 0) {
        cardElement.querySelector('.popup__photo').src = photo;
      } else {
        var cardPhotoElement = cardElement.querySelector('.popup__photo').cloneNode();
        cardPhotoElement.src = photo;
        cardPhotosParentBlock.appendChild(cardPhotoElement);
      }
    });
  } else {
    cardElement.querySelector('.popup__photo').style.display = 'none';
  }
};

var getTimeCheckInOut = function (checkIn, checkOut) {
  var timeCheckInOut = '';
  if (checkIn && checkOut) {
    timeCheckInOut = 'Заезд после ' + checkIn + ', выезд до ' + checkOut;
  } else if (checkIn) {
    timeCheckInOut = 'Заезд после ' + checkIn;
  } else if (checkOut) {
    timeCheckInOut = 'Выезд до ' + checkOut;
  }
  return timeCheckInOut;
};

var getCapacity = function (roomsCount, guestsCount) {
  var capacity = '';
  if (roomsCount && guestsCount) {
    capacity = roomsCount + ' комнаты для ' + guestsCount + ' гостей';
  } else if (roomsCount) {
    capacity = roomsCount + ' комнаты';
  } else if (guestsCount) {
    capacity = 'Для ' + guestsCount + ' гостей';
  }
  return capacity;
};

var renderMapCard = function (advert) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var photosBlock = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = advert.offer.title || '';
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address || '';
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price ? advert.offer.price + '₽/ночь' : '';
  cardElement.querySelector('.popup__type').textContent = TYPES_TITLE[advert.offer.type] || '';
  cardElement.querySelector('.popup__text--capacity').textContent = getCapacity(advert.offer.rooms, advert.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = getTimeCheckInOut(advert.offer.checkin, advert.offer.checkout);
  var features = cardElement.querySelectorAll('.popup__features > .popup__feature');
  showListItemsByClass(features, 'popup__feature--', advert.offer.features);
  cardElement.querySelector('.popup__description').textContent = advert.offer.description || '';
  renderCardPhotos(cardElement, advert.offer.photos, photosBlock);
  if (advert.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  }
  return cardElement;
};

var adverts = getAdverts(ADVERT_ARRAY_LENGTH);
map.classList.toggle('map--faded');
var fragment = document.createDocumentFragment();
adverts.forEach(function (advert) {
  fragment.appendChild(renderMapPin(advert));
});
mapPinsList.appendChild(fragment);
map.insertBefore(renderMapCard(adverts[0]), map.querySelector('.map__filters-container'));
