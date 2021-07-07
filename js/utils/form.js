const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelector('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFieldset = mapFilters.querySerlector('fieldset');
const mapElements = mapFilters.querySerlector('select');


function deactivatePage() {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFieldset.setAttribute('disabled','disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled','disabled');
  });

  mapElements.forEach((element) => {
    element.setAttribute('disabled','disabled');
  });

}

function activatePage() {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFieldset.removeAttribute('disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

}

export {deactivatePage, activatePage};
