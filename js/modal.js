'use strict';

window.modal = (function () {
  var main = document.querySelector('main');

  function handleEsc(el, evt) {
    if (evt.key === 'Escape') {
      el.remove();
      el.removeEventListener('keydown', handleEsc);
    }
  }

  function renderSuccessModal() {
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

  function renderErrorModal() {
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

  return {
    renderSuccessModal: renderSuccessModal,
    renderErrorModal: renderErrorModal,
  };
})();
