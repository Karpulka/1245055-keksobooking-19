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
var stringTemplates = {
  capacity: {
    rooms: '#value# комнаты',
    guests: 'Для #value# гостей'
  },
  time: {
    checkin: 'Заезд после #value#',
    checkout: 'Выезд до #value#',
    delimeter: ', '
  }
};

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
      location: new LocationCoordinates(location.x + offsetX, location.y + offsetY)
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
  if (!cardPhotos.length) {
    return cardElement.querySelector('.popup__photo').remove();
  }
  cardElement.querySelector('.popup__photo').src = cardPhotos[0];
  cardPhotos.slice(1).forEach(function (photo) {
    var cardPhotoElement = cardElement.querySelector('.popup__photo').cloneNode();
    cardPhotoElement.src = photo;
    cardPhotosParentBlock.appendChild(cardPhotoElement);
  });
  return true;
};

var getInfoString = function (parameters, delimeter, templateParameter) {
  templateParameter = templateParameter ? templateParameter : '#value#';
  delimeter = delimeter ? delimeter : ' ';
  var result = '';
  if (parameters.length > 0) {
    result = result + parameters[0].template.replace(templateParameter, parameters[0].value);
    parameters.slice(1).forEach(function (item) {
      result = delimeter ? result + delimeter : result;
      if (item.value) {
        var templateString = item.template.replace(templateParameter, item.value);
        result = result + templateString[0].toLowerCase() + templateString.slice(1);
      }
    });
  }
  return result;
};

var renderCardElement = function (cardElement, selector, attribute, value) {
  if (value) {
    cardElement.querySelector(selector)[attribute] = value;
  } else {
    cardElement.querySelector(selector).remove();
  }
};

var renderCardElementCarried = function (cardElement) {
  return function (selector, attribute, value) {
    return renderCardElement(cardElement, selector, attribute, value);
  };
};

var getInfoArguments = function (data, type) {
  if (!data) {
    return false;
  }

  var result = [];
  data.forEach(function (item) {
    var keys = Object.keys(item);
    if (item[keys[0]]) {
      var parameters = {
        value: item[keys[0]],
        template: stringTemplates[type][keys[0]]
      };
      result.push(parameters);
    }
  });
  return result;
};

var renderMapCard = function (advert) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var photosBlock = cardElement.querySelector('.popup__photos');
  var renderElement = renderCardElementCarried(cardElement);
  var offer = advert.offer;
  var price = offer.price ? offer.price + '₽/ночь' : '';
  var capacity = getInfoArguments([{rooms: offer.rooms}, {guests: offer.guests}], 'capacity');
  var time = getInfoArguments([{checkin: offer.checkin}, {checkout: offer.checkout}], 'time');
  var features = cardElement.querySelectorAll('.popup__features > .popup__feature');
  renderElement('.popup__title', 'textContent', offer.title);
  renderElement('.popup__text--address', 'textContent', offer.address);
  renderElement('.popup__text--price', 'textContent', price);
  renderElement('.popup__type', 'textContent', TYPES_TITLE[offer.type]);
  renderElement('.popup__text--capacity', 'textContent', getInfoString(capacity));
  renderElement('.popup__text--time', 'textContent', getInfoString(time, stringTemplates.time.delimeter));
  showListItemsByClass(features, 'popup__feature--', offer.features);
  renderElement('.popup__description', 'textContent', offer.description);
  renderCardPhotos(cardElement, offer.photos, photosBlock);
  renderElement('.popup__avatar', 'src', advert.author.avatar);
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
