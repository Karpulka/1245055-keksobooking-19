'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };

  var LocationCoordinate = function (x, y, offsetX, offsetY) {
    offsetX = offsetX ? offsetX : 0;
    offsetY = offsetY ? offsetY : 0;
    x += offsetX;
    y += offsetY;
    return {x: x, y: y};
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  window.data = {
    LocationCoordinate: LocationCoordinate,
    load: load
  };
})();
