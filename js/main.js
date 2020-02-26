'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

  var activatePage = function () {
    window.form.toggleFormDisabled();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var adverts = window.advert.getAdverts(window.data.ADVERT_ARRAY_LENGTH);
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (advert) {
      fragment.appendChild(window.pin.renderMapPin(advert));
    });
    mapPinsList.appendChild(fragment);
    map.insertBefore(window.advert.renderMapCard(adverts[0]), map.querySelector('.map__filters-container'));
    document.removeEventListener('mouseup', window.pin.onMainPinClick);
    document.removeEventListener('keyup', window.pin.onMainPinKeyPress);
  };

  var activatePageElements = function () {
    activatePage();
    window.form.setAddressFieldValue(mainPin);
    window.form.setValidateErrorsMessages();
  };

  window.form.setAddressFieldValue(mainPin, true);
  window.form.toggleFormDisabled(true);

  mainPin.addEventListener('mousedown', window.pin.onMainPinClick.bind(null, activatePageElements));
  mainPin.addEventListener('keydown', window.pin.onMainPinKeyPress.bind(null, activatePageElements));
})();
