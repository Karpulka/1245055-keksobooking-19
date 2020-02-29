'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      window.form.toggleFormDisabled();
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.setAddressFieldValue(mainPin);
      document.removeEventListener('mousedown', window.mainPin.onMainPinClick);
      document.removeEventListener('keydown', window.mainPin.onMainPinEnterPress);
    }
  };

  var onSuccess = function (data) {
    var adverts = data;
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
  };

  var activatePageElements = function () {
    activatePage();
    window.data.load(onSuccess, window.util.showErrorMessage);
    window.form.setValidateErrorsMessages();
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleFormDisabled(true);

  mainPin.addEventListener('mousedown', window.mainPin.onMainPinClick.bind(null, activatePageElements), {once: true});
  mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress.bind(null, activatePageElements), {once: true});
})();
