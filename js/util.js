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

  var onErrorWindowClose = function (evt) {
    if (evt.type === 'click' || evt.key === KEY_ENTER || evt.key === KEY_ESCAPE) {
      document.querySelector('.error').remove();

      document.removeEventListener('click', onErrorWindowClose);
      evt.target.removeEventListener('keydown', onErrorWindowClose);
    }
  };

  var showErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    var errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorCloseButton = errorBlock.querySelector('.error__button');

    fragment.appendChild(errorBlock);
    document.querySelector('body').appendChild(errorBlock);

    document.addEventListener('click', onErrorWindowClose);
    errorCloseButton.addEventListener('keydown', onErrorWindowClose);

    errorCloseButton.focus();
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    getRandomValue: getRandomValue,
    getRandomItemFromArray: getRandomItemFromArray,
    isLeftMouseButtonClick: isLeftMouseButtonClick,
    showErrorMessage: showErrorMessage
  };
})();
