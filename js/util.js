'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESCAPE = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  var isEnterEvent = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  var isEscapeEvent = function (evt, action) {
    if (evt.key === KEY_ESCAPE) {
      action();
    }
  };

  var isLeftMouseButtonClick = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItemFromArray = function (array) {
    var min = 0;
    var max = array.length;
    return array[Math.floor(Math.random() * (max - min)) + min];
  };

  var setPreloader = function () {
    var img = document.querySelector('.map__pin--main > img').cloneNode();
    var adForm = document.querySelector('.ad-form');
    adForm.classList.add('ad-form--disabled');
    adForm.querySelector('[type="submit"]').setAttribute('disabled', 'disabled');
    img.classList.add('preloader');
    img.setAttribute('width', '80');
    img.setAttribute('height', '88');
    adForm.after(img);
  };

  var removePreloader = function () {
    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelector('[type="submit"]').removeAttribute('disabled');
    document.querySelector('.preloader').remove();
  };

  var onErrorWindowClose = function (evt) {
    if (evt.type === 'click' || evt.key === KEY_ENTER || evt.key === KEY_ESCAPE) {
      document.querySelector('.error').remove();

      document.removeEventListener('click', onErrorWindowClose);
      document.removeEventListener('keydown', onErrorWindowClose);
      evt.target.removeEventListener('keydown', onErrorWindowClose);
    }
  };

  var onSuccessWindowClose = function (evt) {
    if (evt.type === 'click' || evt.key === KEY_ESCAPE) {
      document.querySelector('.success').remove();

      document.removeEventListener('click', onSuccessWindowClose);
      document.removeEventListener('keydown', onSuccessWindowClose);
    }
  };

  var showErrorMessage = function (message) {
    var fragment = document.createDocumentFragment();
    var errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorCloseButton = errorBlock.querySelector('.error__button');

    if (message) {
      errorBlock.querySelector('.error__message').textContent = message;
    }

    fragment.appendChild(errorBlock);
    document.querySelector('body').appendChild(errorBlock);

    removePreloader();

    document.addEventListener('click', onErrorWindowClose);
    errorCloseButton.addEventListener('keydown', onErrorWindowClose);

    errorCloseButton.focus();
  };

  var showSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    fragment.appendChild(successBlock);
    document.querySelector('body').appendChild(successBlock);

    removePreloader();

    document.addEventListener('click', onSuccessWindowClose);
    document.addEventListener('keydown', onSuccessWindowClose);
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    getRandomValue: getRandomValue,
    getRandomItemFromArray: getRandomItemFromArray,
    isLeftMouseButtonClick: isLeftMouseButtonClick,
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage,
    setPreloader: setPreloader
  };
})();
