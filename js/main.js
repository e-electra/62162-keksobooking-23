import {adFormSubmit, adFormReset, deactivatePage} from './utils/form.js';
import {resetMarker, map, mainPinMarker, initAdvertsOnMap} from './map.js';
import { getData } from './api.js';
import {showSubmitSuccess, showSubmitError, showDataLoadError, removeNotifications} from './notifications.js';
import { SIMILAR_ADVERTISEMENT_COUNT } from './data.js';

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
    initAdvertsOnMap(map, adverts.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
  },
  () => {
    showDataLoadError('Не удалось загрузить похожие объявления', 5000);
  },
);

document.body.addEventListener('click', removeNotifications);
document.body.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    removeNotifications();
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
