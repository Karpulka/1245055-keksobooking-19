'use strict';

var ADVERT_ARRAY_LENGTH = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
  var pinWidth = pin.style.width;
  var pinHeight = pin.style.height;
  var locationX = advert.offer.location.x + Math.ceil(pinWidth / 2);
  var locationY = advert.offer.location.y + Math.ceil(pinHeight / 2);
  advertElement.style.left = locationX + 'px';
  advertElement.style.top = locationY + 'px';
  pin.src = advert.author.avatar;
  pin.alt = advert.offer.title;
  return advertElement;
};

var adverts = getAdverts(ADVERT_ARRAY_LENGTH);
map.classList.toggle('map--faded');
var fragment = document.createDocumentFragment();
adverts.forEach(function (advert) {
  fragment.appendChild(renderMapPin(advert));
});
mapPinsList.appendChild(fragment);
