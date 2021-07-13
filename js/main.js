import {deactivatePage} from './utils/form.js';
import {resetMarker, map, mainPinMarker} from './map.js';

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
