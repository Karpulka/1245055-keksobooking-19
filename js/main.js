'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinStartCoords = {
    x: mainPin.style.left,
    y: mainPin.style.top
  };
  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterFields = mapFilter.children;

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
    window.pin.renderPins(data);
    if (data.length > 0) {
      window.form.toggleFormDisabled(mapFilterFields);
    }
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
    window.form.toggleFormDisabled(mapFilterFields);
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
  window.form.toggleFormDisabled();
  window.form.toggleFormDisabled(mapFilterFields);

  mainPin.addEventListener('mousedown', window.mainPin.onMainPinClick.bind(null, activatePageElements), {once: true});
  mainPin.addEventListener('keydown', window.mainPin.onMainPinEnterPress.bind(null, activatePageElements), {once: true});

  adForm.addEventListener('submit', onFormSubmit);
})();
