import {adFormSubmit, adFormReset, deactivatePage, showSubmitSuccess, showSubmitError} from './utils/form.js';
import { showAlert } from './util.js';
import {resetMarker, map, mainPinMarker, initAdvertsOnMap} from './map.js';
import { getData } from './api.js';

const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

document.addEventListener('DOMContentLoaded', () => {
  deactivatePage();
});

submitButton.addEventListener('click', () => {
  resetMarker(mainPinMarker, map);
});

resetButton.addEventListener('click', () => {
  resetMarker(mainPinMarker, map);
});

getData(
  (adverts) => {
    initAdvertsOnMap(map, adverts);
  },
  () => {
    showAlert('Не удалось загрузить похожие объявления', 5000);
  },
);

function removeMessages() {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  if (successElement) {
    successElement.remove();
  }

  if (errorElement) {
    errorElement.remove();
  }
}

document.body.addEventListener('click', removeMessages);
document.body.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    removeMessages();
  }
});

adFormSubmit(
  () => {
    showSubmitSuccess();
  },
  () => {
    showSubmitError();
  },
);

adFormReset();
