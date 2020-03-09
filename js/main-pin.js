'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition = window.pin.getPosition(mainPin);
  var rangeY = {
    min: 130 - mainPinPosition.y,
    max: 630 - mainPinPosition.y
  };
  var rangeX = {
    min: 0 - mainPinPosition.x,
    max: map.clientWidth - mainPinPosition.x
  };

  var onMainPinClick = function (action, evt) {
    window.util.isLeftMouseButtonClick(evt, action);
  };

  var onMainPinEnterPress = function (action, evt) {
    window.util.isEnterEvent(evt, action);
  };

  var onMaiPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordinates = new window.data.LocationCoordinate(evt.clientX, evt.clientY);

    var onMaiPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new window.data.LocationCoordinate(startCoordinates.x, startCoordinates.y, -moveEvt.clientX, -moveEvt.clientY);

      startCoordinates.x = moveEvt.clientX;
      startCoordinates.y = moveEvt.clientY;

      var offsetY = mainPin.offsetTop - shift.y;
      var offsetX = mainPin.offsetLeft - shift.x;

      mainPin.style.top = offsetY <= rangeY.max && offsetY >= rangeY.min ? offsetY + 'px' : mainPin.style.top;
      mainPin.style.left = offsetX <= rangeX.max && offsetX >= rangeX.min ? offsetX + 'px' : mainPin.style.left;

      window.form.setAddressFieldValue(mainPin);
    };

    var onMaiPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddressFieldValue(mainPin);
      document.removeEventListener('mousemove', onMaiPinMouseMove);
      document.removeEventListener('mouseup', onMaiPinMouseUp);
    };

    document.addEventListener('mousemove', onMaiPinMouseMove);
    document.addEventListener('mouseup', onMaiPinMouseUp);
  };

  mainPin.addEventListener('mousedown', onMaiPinMouseDown);

  window.mainPin = {
    onMainPinClick: onMainPinClick,
    onMainPinEnterPress: onMainPinEnterPress
  };
})();
