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
      var adverts = window.advert.getAdverts(window.data.ADVERT_ARRAY_LENGTH);
      var fragment = document.createDocumentFragment();
      adverts.forEach(function (advert) {
        var pin = window.pin.renderMapPin(advert);
        fragment.appendChild(pin);
        pin.addEventListener('click', window.pin.onPinClick.bind(null, advert));
        pin.addEventListener('keydown', window.pin.onPinEnterPress.bind(null, advert));
      });
      mapPinsList.appendChild(fragment);
      document.removeEventListener('mousedown', window.pin.onMainPinClick);
      document.removeEventListener('keydown', window.pin.onMainPinEnterPress);
    }
  };

  var activatePageElements = function () {
    activatePage();
    window.form.setAddressFieldValue(mainPin);
    window.form.setValidateErrorsMessages();
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleFormDisabled(true);

  mainPin.addEventListener('mousedown', window.pin.onMainPinClick.bind(null, activatePageElements));
  mainPin.addEventListener('keydown', window.pin.onMainPinEnterPress.bind(null, activatePageElements));
})();
