'use strict';

window.load = (function () {
  var StatusCode = {
    OK: 200
  };

  function getData(onSuccess) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  }

  function sendData(data, onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // onSuccess(xhr.response);
      onError(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  return {
    getData: getData,
    sendData: sendData,
  };
})();
