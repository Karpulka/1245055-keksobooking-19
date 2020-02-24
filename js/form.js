'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;
  var adFormAddressField = adForm.querySelector('[name="address"]');
  var adFormPriceField = adForm.querySelector('[name="price"]');
  var adFormTypeField = adForm.querySelector('[name="type"]');
  var adFormTimeInField = adForm.querySelector('[name="timein"]');
  var adFormTimeOutField = adForm.querySelector('[name="timeout"]');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterFields = mapFilter.children;

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

  var enable = function (element) {
    element.removeAttribute('disabled');
  };

  var disable = function (element) {
    element.setAttribute('disabled', 'disabled');
  };

  var toggleDisabledElement = function (element) {
    return element.getAttribute('disabled') ? enable(element) : disable(element);
  };

  var toggleFormDisabled = function () {
    var formsElementsActivationToggle = function (list) {
      [].forEach.call(list, toggleDisabledElement);
    };
    [adFormFields, mapFilterFields].forEach(function (item) {
      formsElementsActivationToggle(item);
    });
  };

  var setAddressFieldValue = function (pin, isPageNoActive) {
    var left = parseFloat(pin.style.left.split('px')[0]);
    var top = parseFloat(pin.style.top.split('px')[0]);
    var height = pin.offsetHeight;
    var width = pin.offsetWidth;
    var afterHeight = isPageNoActive ? 0 : parseFloat(window.getComputedStyle(pin, ':after').height.split('px')[0]);
    var offsetX = width / 2;
    var offsetY = height / 2 + afterHeight;
    var coordinates = new window.data.LocationCoordinate(left, top, offsetX, offsetY);
    adFormAddressField.value = coordinates.x + ', ' + coordinates.y;
  };

  var setValidateErrorsMessages = function () {
    var roomNumberValue = adForm.querySelector('[name="rooms"]').value.toString();
    var capacity = adForm.querySelector('[name="capacity"]');
    var errorMessage = window.data.ROOMS_GUESTS[roomNumberValue].guests.indexOf(capacity.value) > -1 ? '' : window.data.ROOMS_GUESTS[roomNumberValue].errorMessage;
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

  Array.from(adFormFields).forEach(function (fieldBlock) {
    var field = fieldBlock.querySelectorAll('input');
    field.forEach(function (element) {
      element.addEventListener('invalid', setValidityMessage);
    });
  });

  adForm.querySelector('[name="capacity"]').addEventListener('change', setValidateErrorsMessages);
  adForm.querySelector('[name="rooms"]').addEventListener('change', setValidateErrorsMessages);

  adFormTypeField.addEventListener('change', setMinPrice);
  adFormTimeInField.addEventListener('change', setTimeInOutValue);
  adFormTimeOutField.addEventListener('change', setTimeInOutValue);

  window.form = {
    toggleFormDisabled: toggleFormDisabled,
    setAddressFieldValue: setAddressFieldValue,
    setValidateErrorsMessages: setValidateErrorsMessages
  };
})();
