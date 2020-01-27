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

function LocationCoordinates(x, y, offset) {
  if (!offset) {
    offset = 0;
  }
  x += offset;
  y += offset;
  return {x: x, y: y};
}

var getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
};

var getAdverts = function (count) {
  var adverts = [];
  for (var i = 1; i < count + 1; i++) {
    var room = getRandomValue(1, 5);
    var location = new LocationCoordinates(600, 350, i);
    var featuresLength = getRandomValue(1, FEATURES.length);
    var photosLength = getRandomValue(1, PHOTOS.length);
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Апартаменты ' + i,
        address: location.x + ', ' + location.y,
        price: getRandomValue(10000, 35000),
        type: getRandomItemFromArray(TYPES),
        rooms: room,
        guests: room * GUESTS_IN_ROOM,
        checkin: getRandomItemFromArray(CHECK_TIMES),
        checkout: getRandomItemFromArray(CHECK_TIMES),
        features: FEATURES.splice(featuresLength),
        description: 'А здесь мы пишем описание квартирки №' + i,
        photos: PHOTOS.splice(photosLength),
        location: {
          x: location.x,
          y: location.y
        }
      }
    };
    adverts.push(obj);
  }
  return adverts;
};

console.log(getAdverts(ADVERT_ARRAY_LENGTH));
