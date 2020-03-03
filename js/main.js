'use strict';

(function () {
  var ADVERT_COUNT = 5;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinStartCoords = {
    x: mainPin.style.left,
    y: mainPin.style.top
  };
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

  var onSuccessLoad = function (data) {
    var adverts = window.data.setFilter(data, ADVERT_COUNT);
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
    window.data.load(onSuccessLoad, window.util.showErrorMessage);
    window.form.setValidateErrorsMessages();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.data.send(onSuccessSend, window.util.showErrorMessage, new FormData(adForm));
  };

  var onSuccessSend = function () {
    window.util.showSuccessMessage();
    deactivatePage();
    window.form.toggleFormDisabled();
  };

  var deactivatePage = function () {
    window.pin.removePins();
    mainPin.style.left = mainPinStartCoords.x;
    mainPin.style.top = mainPinStartCoords.y;

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form.clearForm();

    mainPin.addEventListener('mousedown', window.mainPin.onMainPinClick.bind(null, activatePageElements), {once: true});
    mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress.bind(null, activatePageElements), {once: true});
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleFormDisabled(true);

  mainPin.addEventListener('mousedown', window.mainPin.onMainPinClick.bind(null, activatePageElements), {once: true});
  mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress.bind(null, activatePageElements), {once: true});

  adForm.addEventListener('submit', onFormSubmit);
})();
