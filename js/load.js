'use strict';

window.load = (function () {
  function getData(onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var StatusCode = {
      OK: 200
    };

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

  return {
    getData: getData
  }
})();
