'use strict';

(function () {
  var main = document.querySelector('main');

  function handleEsc(el, evt) {
    if (evt.key === window.constants.KEY_ESC) {
      el.remove();
      el.removeEventListener('keydown', handleEsc);
    }
  }

  function renderSuccess() {
    var successModalClone = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);
    var handleSuccessEsc = handleEsc.bind(null, successModalClone);

    successModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.success')) {
        successModalClone.remove();
      }
    });

    document.addEventListener('keydown', handleSuccessEsc);

    main.appendChild(successModalClone);
  }

  function renderError() {
    var errorModalClone = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var errorButton = errorModalClone.querySelector('.error__button');
    var handleErrorEsc = handleEsc.bind(null, errorModalClone);

    errorButton.addEventListener('click', function () {
      errorModalClone.remove();
    });

    errorModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.error')) {
        errorModalClone.remove();
      }
    });

    document.addEventListener('keydown', handleErrorEsc);

    main.appendChild(errorModalClone);
  }

  window.modal = {
    renderSuccess: renderSuccess,
    renderError: renderError,
  };
})();
