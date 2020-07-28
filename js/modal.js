'use strict';

(function () {
  var main = document.querySelector('main');

  function renderSuccess() {
    var successModalClone = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);

    function onSuccessModalEsc(evt) {
      if (evt.key === window.constants.KEY_ESC) {
        successModalClone.remove();
        document.removeEventListener('keydown', onSuccessModalEsc);
      }
    }

    successModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.success')) {
        successModalClone.remove();
        document.removeEventListener('keydown', onSuccessModalEsc);
      }
    });

    document.addEventListener('keydown', onSuccessModalEsc);

    main.appendChild(successModalClone);
  }

  function renderError() {
    var errorModalClone = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var errorButton = errorModalClone.querySelector('.error__button');

    function onErrorModalEsc(evt) {
      if (evt.key === window.constants.KEY_ESC) {
        errorModalClone.remove();
        document.removeEventListener('keydown', onErrorModalEsc);
      }
    }

    errorButton.addEventListener('click', function () {
      errorModalClone.remove();
      document.removeEventListener('keydown', onErrorModalEsc);
    });

    errorModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.error')) {
        errorModalClone.remove();
      }
    });

    document.addEventListener('keydown', onErrorModalEsc);

    main.appendChild(errorModalClone);
  }

  window.modal = {
    renderSuccess: renderSuccess,
    renderError: renderError,
  };
})();
