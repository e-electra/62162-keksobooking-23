import {adFormSubmit, adFormReset, deactivatePage} from './utils/form.js';
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

adFormSubmit(
  () => {
    showAlert('Отправлено!');
  },
  () => {
    showAlert('Ошибка отправки!');
  },
);

adFormReset();
