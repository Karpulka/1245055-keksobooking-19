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
      document.removeEventListener('mousedown', window.mainPin.onMainPinClick);
      document.removeEventListener('keydown', window.mainPin.onMainPinEnterPress);
    }
  };

  var activatePageElements = function () {
    activatePage();
    window.form.setValidateErrorsMessages();
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleFormDisabled(true);

  mainPin.addEventListener('mousedown', window.mainPin.onMainPinClick.bind(null, activatePageElements));
  mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress.bind(null, activatePageElements));
})();
