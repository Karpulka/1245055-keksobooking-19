'use strict';

(function () {
  var roomGuest = {
    '1': {
      guests: ['1'],
      errorMessage: '1 комната — «для 1 гостя»'
    },
    '2': {
      guests: ['1', '2'],
      errorMessage: '2 комнаты — «для 2 гостей» или «для 1 гостя»'
    },
    '3': {
      guests: ['1', '2', '3'],
      errorMessage: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»'
    },
    '100': {
      guests: ['0'],
      errorMessage: '100 комнат — «не для гостей»'
    }
  };

  var minPrices = {
    bungalo: '0',
    flat: '1 000',
    house: '5 000',
    palace: '10 000'
  };

  var minPriceErrorMessage = {
    '0': '«Бунгало» — минимальная цена за ночь 0',
    '1000': '«Квартира» — минимальная цена за ночь 1 000',
    '5000': '«Дом» — минимальная цена 5 000',
    '10000': '«Дворец» — минимальная цена 10 000'
  };

  var validationMessages = [
    {
      name: 'tooShort',
      getMessage: function (element) {
        return 'Имя должно состоять минимум из ' + element.getAttribute('minlength') + ' символов';
      }
    },
    {
      name: 'tooLong',
      getMessage: function (element) {
        return 'Имя не должно превышать ' + element.getAttribute('maxlength') + ' символов';
      }
    },
    {
      name: 'valueMissing',
      message: 'Обязательное поле'
    },
    {
      name: 'rangeOverflow',
      getMessage: function (element) {
        return 'Максимальное значение — ' + element.getAttribute('max');
      }
    },
    {
      name: 'rangeUnderflow',
      getMessage: function (element) {
        return minPriceErrorMessage[element.getAttribute('min')];
      }
    }
  ];

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;
  var adFormAddressField = adForm.querySelector('[name="address"]');
  var adFormPriceField = adForm.querySelector('[name="price"]');
  var adFormTypeField = adForm.querySelector('[name="type"]');
  var adFormTimeInField = adForm.querySelector('[name="timein"]');
  var adFormTimeOutField = adForm.querySelector('[name="timeout"]');
  var adFormAvatarChooser = adForm.querySelector('[name="avatar"]');
  var adFormAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormDefaultAvatarPreviewSrc = adFormAvatarPreview.src;
  var adFormPhotoChooser = adForm.querySelector('[name="images"]');
  var adFormPhotoContainer = adForm.querySelector('.ad-form__photo');
  var adFormFeatures = adForm.querySelectorAll('[name="features"]');

  var enable = function (element) {
    element.removeAttribute('disabled');
  };

  var disable = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var toggleDisabledElement = function (element) {
    var elementDisable = element.getAttribute('disabled');
    if (elementDisable) {
      adForm.addEventListener('reset', onFormReset);
    } else {
      adForm.removeEventListener('reset', onFormReset);
    }
    return element.getAttribute('disabled') ? enable(element) : disable(element);
  };

  var onFormReset = function () {
    var map = document.querySelector('.map');
    var mainPin = map.querySelector('.map__pin--main');

    var pageIsActive = adForm.classList.contains('ad-form--disabled') ? true : false;

    setAddressFieldValue(mainPin, pageIsActive);
  };

  var toggleDisabled = function (form) {
    form = form ? form : adFormFields;
    var formsElementsActivationToggle = function (list) {
      [].forEach.call(list, toggleDisabledElement);
    };
    [form].forEach(function (item) {
      formsElementsActivationToggle(item);
    });
  };

  var setAddressFieldValue = function (pin, isPageNoActive) {
    var left = parseFloat(pin.style.left.split('px')[0]);
    var top = parseFloat(pin.style.top.split('px')[0]);
    var pinPosition = window.pin.getPosition(pin, isPageNoActive);
    var coordinates = new window.data.LocationCoordinate(left, top, pinPosition.x, pinPosition.y);
    adFormAddressField.setAttribute('value', coordinates.x + ', ' + coordinates.y);
  };

  var setValidateErrorsMessages = function () {
    var roomNumberValue = adForm.querySelector('[name="rooms"]').value.toString();
    var capacity = adForm.querySelector('[name="capacity"]');
    var errorMessage = roomGuest[roomNumberValue].guests.indexOf(capacity.value) > -1 ? '' : roomGuest[roomNumberValue].errorMessage;
    capacity.setCustomValidity(errorMessage);
  };

  var setValidityMessage = function (evt) {
    var element = evt.target;
    for (var i = 0; i < validationMessages.length; i++) {
      var item = validationMessages[i];
      if (element.validity[item.name]) {
        element.setCustomValidity(typeof item.message === 'string' ? item.message : item.getMessage(element));
        break;
      }
      element.setCustomValidity('');
    }
  };

  var setMinPrice = function (evt) {
    var minPrice = minPrices[evt.target.value];
    adFormPriceField.setAttribute('min', parseInt(minPrice.replace(' ', ''), 10));
    adFormPriceField.setAttribute('placeholder', minPrice);
  };

  var setTimeInOutValue = function (evt) {
    var value = evt.target.value;
    if (evt.target.getAttribute('name') === 'timein') {
      adFormTimeOutField.value = value;
    } else {
      adFormTimeInField.value = value;
    }
  };

  var clear = function () {
    adForm.reset();
    adFormAvatarPreview.src = adFormDefaultAvatarPreviewSrc;
  };

  var toggleFeature = function (feature, evt) {
    evt.preventDefault();
    feature.click();
  };

  var onFeatureEnterPress = function (evt) {
    window.util.isEnterEvent(evt, toggleFeature.bind(null, evt.target, evt));
  };

  Array.from(adFormFields).forEach(function (fieldBlock) {
    var field = fieldBlock.querySelectorAll('input');
    field.forEach(function (element) {
      element.addEventListener('invalid', setValidityMessage);
    });
  });

  adFormFeatures.forEach(function (feature) {
    feature.addEventListener('keydown', onFeatureEnterPress);
  });

  adForm.querySelector('[name="capacity"]').addEventListener('change', setValidateErrorsMessages);
  adForm.querySelector('[name="rooms"]').addEventListener('change', setValidateErrorsMessages);

  adFormTypeField.addEventListener('change', setMinPrice);
  adFormTimeInField.addEventListener('change', setTimeInOutValue);
  adFormTimeOutField.addEventListener('change', setTimeInOutValue);

  adFormAvatarChooser.addEventListener('change', window.file.onFileChange.bind(null, adFormAvatarPreview, false));
  adFormPhotoChooser.addEventListener('change', window.file.onFileChange.bind(null, adFormPhotoContainer, true));

  window.form = {
    toggleDisabled: toggleDisabled,
    setAddressFieldValue: setAddressFieldValue,
    setValidateErrorsMessages: setValidateErrorsMessages,
    clear: clear,
    onFeatureEnterPress: onFeatureEnterPress
  };
})();
