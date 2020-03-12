'use strict';

(function () {
  var ADVERT_COUNT = 5;
  var Pin = {
    HEIGHT: 70,
    WIDTH: 50
  };
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  var renderMapPin = function (advert) {
    var advertElement = mapPinTemplate.cloneNode(true);
    var pin = advertElement.querySelector('img');
    var locationX = advert.location.x;
    var locationY = advert.location.y;
    advertElement.style.left = locationX - (Pin.WIDTH / 2) + 'px';
    advertElement.style.top = locationY - Pin.HEIGHT + 'px';
    pin.src = advert.author.avatar;
    pin.alt = advert.offer.title;
    return advertElement;
  };

  var onMouseClick = function (advert) {
    window.advert.show(advert);
  };

  var onEnterPress = function (advert, evt) {
    window.util.isEnterEvent(evt, window.advert.show.bind(null, advert));
  };

  var getPosition = function (pin, isPageNoActive) {
    var height = pin.offsetHeight;
    var width = pin.offsetWidth;
    var afterHeight = isPageNoActive ? 0 : parseFloat(window.getComputedStyle(pin, ':after').height.split('px')[0]);
    var pinPosition = {
      x: Math.ceil(width / 2),
      y: Math.ceil(height / 2 + afterHeight)
    };
    return pinPosition;
  };

  var remove = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var render = function (pins) {
    var adverts = window.filter.set(pins, ADVERT_COUNT);
    if (adverts.length > 0) {
      var fragment = document.createDocumentFragment();
      adverts.forEach(function (advert) {
        if (advert.offer) {
          var pin = renderMapPin(advert);
          fragment.appendChild(pin);
          pin.addEventListener('click', window.pin.onMouseClick.bind(null, advert));
          pin.addEventListener('keydown', window.pin.onEnterPress.bind(null, advert));
        }
      });
      mapPinsList.appendChild(fragment);
    }
  };

  window.pin = {
    onMouseClick: onMouseClick,
    onEnterPress: onEnterPress,
    getPosition: getPosition,
    remove: remove,
    render: render
  };
})();
