'use strict';


(function () {
  var TIMEOUT = 10000;
  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking',
  };
  var StatusCode = {
    OK: 200
  };

  function getData(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  }

  function sendData(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  }

  window.load = {
    getData: getData,
    sendData: sendData,
  };
})();
