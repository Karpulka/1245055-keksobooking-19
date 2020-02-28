'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

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

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      window.form.setAddressFieldValue(mainPin);
    }

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
