'use strict';

window.load = (function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = 10000;

  function getData(onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.open('GET', URL);
    xhr.send();
  }

  function sendData(data, onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.open('POST', URL);
    xhr.send(data);
  }

  return {
    getData: getData,
    sendData: sendData,
  };
})();
