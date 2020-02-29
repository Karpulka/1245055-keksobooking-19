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
    if (evt.type === 'click' || evt.key === KEY_ENTER) {
      document.querySelector('.error-message').remove();

      evt.target.removeEventListener('click', onErrorWindowClose);
      evt.target.removeEventListener('keydown', onErrorWindowClose);
    }
  };

  var showErrorMessage = function (message) {
    var fragment = document.createDocumentFragment();
    var errorContentBlock = document.createElement('div');
    var errorTitleBlock = document.createElement('div');
    var errorMessageBlock = document.createElement('div');
    var errorCloseButton = document.createElement('span');

    errorContentBlock.classList.add('error-message', 'hidden');

    errorTitleBlock.classList.add('error-title');
    errorTitleBlock.textContent = 'Ошибка!';

    errorMessageBlock.classList.add('error-description');
    errorMessageBlock.textContent = message;

    errorCloseButton.classList.add('error-close');
    errorCloseButton.setAttribute('tabindex', 0);
    errorCloseButton.textContent = 'x';

    errorContentBlock.appendChild(errorTitleBlock);
    errorContentBlock.appendChild(errorMessageBlock);
    errorContentBlock.appendChild(errorCloseButton);

    fragment.appendChild(errorContentBlock);

    document.querySelector('body').appendChild(fragment);

    errorCloseButton.addEventListener('click', onErrorWindowClose);
    errorCloseButton.addEventListener('keydown', onErrorWindowClose);

    document.querySelector('.error-message').classList.remove('hidden');

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
