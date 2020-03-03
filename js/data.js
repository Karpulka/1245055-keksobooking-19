'use strict';

(function () {
  var RequestUrl = {
    URL_LOAD: 'https://js.dump.academy/keksobooking/data',
    URL_SEND: 'https://js.dump.academy/keksobooking'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

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

  var load = function (method, url, onSuccess, onError, data) {
    method = method ? method : Method.GET;
    url = url ? url : RequestUrl.URL_LOAD;
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var prefillRequest = function (method, url) {
    return load.bind(null, method, url);
  };

  window.data = {
    LocationCoordinate: LocationCoordinate,
    load: prefillRequest(Method.GET, RequestUrl.URL_LOAD),
    send: prefillRequest(Method.POST, RequestUrl.URL_SEND)
  };
})();
