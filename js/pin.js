'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  window.pin = {
    renderMapPin: renderMapPin,
    onPinClick: onPinClick,
    onPinEnterPress: onPinEnterPress,
    getPinPosition: getPinPosition
  };
})();
