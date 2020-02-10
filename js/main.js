'use strict';

var KEY_ENTER = 'Enter';
var ROOMS_GUESTS = {
  '1': {
    guests: ['1'],
    errorMessage: '1 комната — «для 1 гостя»'
  },
  '2': {
    guests: ['1', '2'],
    errorMessage: '2 комнаты — «для 2 гостей» или «для 1 гостя»'
  },
  '3': {
    guests: ['1', '2', '3'],
    errorMessage: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»'
  },
  '100': {
    guests: ['0'],
    errorMessage: '100 комнат — «не для гостей»'
  }
};
var ADVERT_ARRAY_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var TYPES_TITLE = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };
var GUESTS_IN_ROOM = 2;
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// var stringTemplates = {
//   capacity: {
//     rooms: '#value# комнаты',
//     guests: 'Для #value# гостей'
//   },
//   time: {
//     checkin: 'Заезд после #value#',
//     checkout: 'Выезд до #value#',
//     delimeter: ', '
//   }
// };

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsList = document.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
// var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.children;
var adFormAddressField = adForm.querySelector('[name="address"]');
var mapFilter = document.querySelector('.map__filters');
var mapFilterFields = mapFilter.children;

function LocationCoordinates(x, y, offsetX, offsetY) {
  offsetX = offsetX ? offsetX : 0;
  offsetY = offsetY ? offsetY : 0;
  x += offsetX;
  y += offsetY;
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
      location: new LocationCoordinates(location.x, location.y, offsetX, offsetY)
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
/*
var showListItemsByClass = function (listItems, classIndicators) {
  listItems.forEach(function (listItem) {
    var featureName = listItem.classList[1].split('--')[1];
    if (classIndicators.indexOf(featureName) === -1) {
      listItem.style.display = 'none';
    }
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

var renderCardElement = function (cardElement, values, attribute, selectorPrefix) {
  attribute = attribute ? attribute : 'textContent';
  selectorPrefix = selectorPrefix ? selectorPrefix : '.popup__';
  if (values) {
    for (var code in values) {
      if (values[code]) {
        cardElement.querySelector(selectorPrefix + code)[attribute] = values[code];
      } else {
        cardElement.querySelector(selectorPrefix + code).remove();
      }
    }
  }
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
  var renderElement = renderCardElement.bind(null, cardElement);
  var offer = advert.offer;
  var price = offer.price ? offer.price + '₽/ночь' : '';
  var capacity = getInfoArguments([{rooms: offer.rooms}, {guests: offer.guests}], 'capacity');
  var time = getInfoArguments([{checkin: offer.checkin}, {checkout: offer.checkout}], 'time');
  var features = cardElement.querySelectorAll('.popup__features > .popup__feature');
  renderElement({
    'title': offer.title,
    'text--address': offer.address,
    'text--price': price,
    'type': TYPES_TITLE[offer.type],
    'text--capacity': getInfoString(capacity),
    'text--time': getInfoString(time, stringTemplates.time.delimeter),
    'description': offer.description
  });
  showListItemsByClass(features, offer.features);
  renderCardPhotos(cardElement, offer.photos, photosBlock);
  renderElement({'avatar': advert.author.avatar}, 'src');
  return cardElement;
};*/

var enable = function (el) {
  el.removeAttribute('disabled');
};

var disable = function (el) {
  el.setAttribute('disabled', 'disabled');
};

var setPageDisabled = function (disabled) {
  var formsElementsActivationToggle = function (items) {
    items.forEach(disabled ? disable : enable);
  };
  [adFormFields, mapFilterFields].forEach(formsElementsActivationToggle);
};

var activatePage = function () {
  setPageDisabled();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  var adverts = getAdverts(ADVERT_ARRAY_LENGTH);
  var fragment = document.createDocumentFragment();
  adverts.forEach(function (advert) {
    fragment.appendChild(renderMapPin(advert));
  });
  mapPinsList.appendChild(fragment);
  // map.insertBefore(renderMapCard(adverts[0]), map.querySelector('.map__filters-container'));
  document.removeEventListener('mouseup', mainPinMouseDownHandler);
  document.removeEventListener('keyup', mainPinKeyDownHandler);
};

var activatePageElements = function () {
  activatePage();
  setAddressFieldValue(mainPin);
  setValidateErrorsMessages();
};

var mainPinMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    activatePageElements();
  }
};

var mainPinKeyDownHandler = function (evt) {
  if (evt.key === KEY_ENTER) {
    activatePageElements();
  }
};

var setAddressFieldValue = function (pin, isPageNoActive) {
  var left = parseFloat(pin.style.left.split('px')[0]);
  var top = parseFloat(pin.style.top.split('px')[0]);
  var height = pin.offsetHeight;
  var width = pin.offsetWidth;
  var afterHeight = isPageNoActive ? 0 : parseFloat(window.getComputedStyle(pin, ':after').height.split('px')[0]);
  var offsetX = width / 2;
  var offsetY = height / 2 + afterHeight;
  var coordinates = new LocationCoordinates(left, top, offsetX, offsetY);
  adFormAddressField.value = coordinates.x + ', ' + coordinates.y;
};

var setValidateErrorsMessages = function () {
  var roomNumberValue = adForm.querySelector('[name="rooms"]').value.toString();
  var capacity = adForm.querySelector('[name="capacity"]');
  var errorMessage = ROOMS_GUESTS[roomNumberValue].guests.indexOf(capacity.value) > -1 ? '' : ROOMS_GUESTS[roomNumberValue].errorMessage;
  capacity.setCustomValidity(errorMessage);
};

setAddressFieldValue(mainPin, true);
setPageDisabled(true);

adForm.querySelector('[name="capacity"]').addEventListener('change', function () {
  setValidateErrorsMessages();
});

adForm.querySelector('[name="rooms"]').addEventListener('change', function () {
  setValidateErrorsMessages();
});

mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
mainPin.addEventListener('keydown', mainPinKeyDownHandler);
