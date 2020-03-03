'use strict';

(function () {
  var ADVERT_COUNT = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  var renderMapPin = function (advert) {
    var advertElement = mapPinTemplate.cloneNode(true);
    var pin = advertElement.querySelector('img');
    var locationX = advert.location.x;
    var locationY = advert.location.y;
    advertElement.style.left = locationX + 'px';
    advertElement.style.top = locationY + 'px';
    pin.src = advert.author.avatar;
    pin.alt = advert.offer.title;
    return advertElement;
  };

  var onPinClick = function (advert) {
    window.advert.showAdvert(advert);
  };

  var onPinEnterPress = function (advert, evt) {
    window.util.isEnterEvent(evt, window.advert.showAdvert.bind(null, advert));
  };

  var getPinPosition = function (pin, isPageNoActive) {
    var height = pin.offsetHeight;
    var width = pin.offsetWidth;
    var afterHeight = isPageNoActive ? 0 : parseFloat(window.getComputedStyle(pin, ':after').height.split('px')[0]);
    var pinPosition = {
      x: Math.ceil(width / 2),
      y: Math.ceil(height / 2 + afterHeight)
    };
    return pinPosition;
  };

  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsList.forEach(function (pin) {
      pin.remove();
    });
  };

  var renderPins = function (pins) {
    var adverts = window.filter.setFilter(pins, ADVERT_COUNT);
    if (adverts.length > 0) {
      var fragment = document.createDocumentFragment();
      adverts.forEach(function (advert) {
        if (advert.offer) {
          var pin = window.pin.renderMapPin(advert);
          fragment.appendChild(pin);
          pin.addEventListener('click', window.pin.onPinClick.bind(null, advert));
          pin.addEventListener('keydown', window.pin.onPinEnterPress.bind(null, advert));
        }
      });
      mapPinsList.appendChild(fragment);
    }
  };

  window.pin = {
    renderMapPin: renderMapPin,
    onPinClick: onPinClick,
    onPinEnterPress: onPinEnterPress,
    getPinPosition: getPinPosition,
    removePins: removePins,
    renderPins: renderPins
  };
})();
