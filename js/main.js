import {adFormSubmit, adFormReset, deactivatePage} from './form.js';
import {resetMarker, map, markerGroup, mainPinMarker, initAdvertsOnMap, updateFilteredMarkers} from './map.js';
import { getData } from './api.js';
import {showSubmitSuccess, showSubmitError, showDataLoadError} from './notifications.js';
import { ADVERTISEMENTS_STATE, SIMILAR_ADVERTISEMENT_COUNT } from './data.js';
import { initFilters, filterAdverts, filtersForm, resetFilters } from './filters.js';

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
    ADVERTISEMENTS_STATE.advertisements = adverts.slice(0, SIMILAR_ADVERTISEMENT_COUNT);
    initAdvertsOnMap(markerGroup, ADVERTISEMENTS_STATE.advertisements);
  },
  () => {
    showDataLoadError('Не удалось загрузить похожие объявления', 5000);
  },
);

adFormSubmit(
  () => {
    showSubmitSuccess();
    resetFilters();
  },
  () => {
    showSubmitError();
  },
);

adFormReset();

initFilters();

filtersForm.addEventListener('change', () => {
  const filteredAdverts = filterAdverts(ADVERTISEMENTS_STATE.advertisements);
  updateFilteredMarkers(markerGroup, filteredAdverts);
});
