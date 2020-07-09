'use strict';

window.modal = (function () {
  var main = document.querySelector('main');

  function renderSuccessModal() {
    var successModalClone = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);

    successModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.success')) {
        successModalClone.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successModalClone.remove();
      }
    });

    main.appendChild(successModalClone);
  }

  function renderErrorModal() {
    var errorModalClone = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);

    var errorButton = errorModalClone.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      errorModalClone.remove();
    });

    errorModalClone.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.error')) {
        errorModalClone.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorModalClone.remove();
      }
    });

    main.appendChild(errorModalClone);
  }

  return {
    renderSuccessModal: renderSuccessModal,
    renderErrorModal: renderErrorModal,
  };
})();
