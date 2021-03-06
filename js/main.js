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
  var resetButton = adForm.querySelector('[type="reset"]');

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      window.form.toggleDisabled();
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.setAddressFieldValue(mainPin);
      document.removeEventListener('mousedown', window.mainPin.onMouseClick);
      document.removeEventListener('keydown', window.mainPin.onEnterPress);
    }
  };

  var onSuccessLoad = function (data) {
    window.pin.render(data);
    if (data.length > 0) {
      window.form.toggleDisabled(mapFilterFields);
    }
  };

  var onPageElementsActivate = function () {
    activatePage();
    window.data.load(onSuccessLoad, window.util.showErrorMessage);
    window.form.onFieldChangeErrorMessage();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.util.setPreloader();
    window.data.send(onSuccessSend, window.util.showErrorMessage, new FormData(adForm));
  };

  var onSuccessSend = function () {
    window.util.showSuccessMessage();
    deactivatePage();
    window.form.toggleDisabled();
    window.form.toggleDisabled(mapFilterFields);
  };

  var resetPage = function () {
    deactivatePage();
    window.form.toggleDisabled();
    window.form.toggleDisabled(mapFilterFields);
  };

  var onButtonResetClick = function () {
    resetPage();
  };

  var onButtonResetKeyPress = function (evt) {
    window.util.isEnterEvent(evt, resetPage);
  };

  var deactivatePage = function () {
    mainPin.style.left = mainPinStartCoords.x;
    mainPin.style.top = mainPinStartCoords.y;

    window.pin.remove();
    window.advert.remove();
    window.file.remove();

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form.clear();
    mapFilter.reset();

    mainPin.addEventListener('mousedown', window.mainPin.onMouseClick.bind(null, onPageElementsActivate), {once: true});
    mainPin.addEventListener('keydown', window.mainPin.onEnterPress.bind(null, onPageElementsActivate), {once: true});
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleDisabled();
  window.form.toggleDisabled(mapFilterFields);

  mainPin.addEventListener('mousedown', window.mainPin.onMouseClick.bind(null, onPageElementsActivate), {once: true});
  mainPin.addEventListener('keydown', window.mainPin.onEnterPress.bind(null, onPageElementsActivate), {once: true});

  adForm.addEventListener('submit', onFormSubmit);

  resetButton.addEventListener('click', onButtonResetClick);
  resetButton.addEventListener('click', onButtonResetKeyPress);
})();
