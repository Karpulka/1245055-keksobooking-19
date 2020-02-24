'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var onMainPinClick = function (action, evt) {
    window.util.isLeftMouseButtonClick(evt, action);
  };

  var onMainPinKeyPress = function (action, evt) {
    window.util.isEnterEvent(evt, action);
  };

  window.pin = {
    onMainPinClick: onMainPinClick,
    onMainPinKeyPress: onMainPinKeyPress,
    renderMapPin: renderMapPin
  };
})();
