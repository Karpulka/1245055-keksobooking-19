'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
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

  var LocationCoordinate = function (x, y, offsetX, offsetY) {
    offsetX = offsetX ? offsetX : 0;
    offsetY = offsetY ? offsetY : 0;
    x += offsetX;
    y += offsetY;
    return {x: x, y: y};
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  var makeAdvert = function (idx) {
    var roomsCount = window.util.getRandomValue(1, 5);
    var location = new LocationCoordinate(600, 350);
    var offsetX = window.util.getRandomValue(-400, 400);
    var offsetY = window.util.getRandomValue(-200, 200);
    var featuresLength = window.util.getRandomValue(0, FEATURES.length - 1);
    var photosStartDelete = window.util.getRandomValue(0, PHOTOS.length - 1);
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + idx + '.png'
      },
      offer: {
        title: 'Апартаменты ' + idx,
        address: location.x + ', ' + location.y,
        price: window.util.getRandomValue(10000, 35000),
        type: window.util.getRandomItemFromArray(TYPES),
        rooms: roomsCount,
        guests: roomsCount * GUESTS_IN_ROOM,
        checkin: window.util.getRandomItemFromArray(CHECK_TIMES),
        checkout: window.util.getRandomItemFromArray(CHECK_TIMES),
        features: FEATURES.slice().splice(featuresLength),
        description: 'А здесь мы пишем описание квартирки №' + idx,
        photos: PHOTOS.slice().splice(photosStartDelete),
        location: new LocationCoordinate(location.x, location.y, offsetX, offsetY)
      }
    };
    return obj;
  };

  window.data = {
    ADVERT_ARRAY_LENGTH: ADVERT_ARRAY_LENGTH,
    TYPES_TITLE: TYPES_TITLE,
    ROOMS_GUESTS: ROOMS_GUESTS,
    makeAdvert: makeAdvert,
    LocationCoordinate: LocationCoordinate,
    load: load
  };
})();
