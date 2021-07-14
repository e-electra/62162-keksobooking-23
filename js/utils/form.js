
import { mainPinMarker, map, resetMarker, getLatLngString} from '../map.js';
import { sendData } from './../api.js';

const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFieldset = mapFilters.querySelector('fieldset');
const mapElements = mapFilters.querySelectorAll('select');

const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');

const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const guestsOptions = Array.from(guestsNumber.querySelectorAll('option'))
  .filter((opt) => Number(opt.value) > 0)
  .sort((prev, next) => Number(prev.value) - Number(next.value))
  .map((opt) => opt.innerText);

const typeSelect = adForm.querySelector('#type');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const featuresCheckboxGroup = adForm.querySelector('#features');
const descriptionTextarea = adForm.querySelector('#description');
const addressInput = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const submitSuccessTemplate = document.querySelector('#success');
const submitErrorTemplate = document.querySelector('#error');

const HOUSING_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};


const MAX_PRICE_VALUE = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

function deactivatePage() {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFieldset.setAttribute('disabled', true);

  formElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapElements.forEach((element) => {
    element.setAttribute('disabled', true);
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

// Form validators
const validateTitle = (event) => {
  const input = event.target;
  const valueLength = event.target.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

const setMinPricesOfType = (evt) => {
  priceInput.setAttribute('min', HOUSING_PRICES[evt.target.value]);
  priceInput.setAttribute('placeholder', HOUSING_PRICES[evt.target.value]);
};


const validatePrice = (event) => {
  const input = event.target;
  const valuePrice = event.target.value;
  const minPrice = Number(input.getAttribute('min'));

  if (valuePrice < minPrice) {
    input.setCustomValidity(`Минимальная цена ${minPrice} руб.`);
  } else if (valuePrice > MAX_PRICE_VALUE) {
    input.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб.`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

const validateRooms = () => {
  const roomsValue = Number(roomsNumber.value);
  const guestsValue = Number(guestsNumber.value);

  if (roomsValue === 100 && guestsValue > 0) {
    roomsNumber.setCustomValidity(guestsNumber.querySelector('option[value="0"]').innerText);
  } else if (roomsValue < guestsValue || guestsValue === 0) {
    roomsNumber.setCustomValidity(
      guestsOptions.slice(0, roomsValue).join(' или\n'),
    );
  } else {
    roomsNumber.setCustomValidity('');
  }

  roomsNumber.reportValidity();
};

const validateGuests = () => {
  const guestsValue = Number(guestsNumber.value);
  const roomsValue = Number(roomsNumber.value);

  if (roomsValue < 100 && guestsValue > 0 && guestsValue <= roomsValue) {
    roomsNumber.setCustomValidity('');
  } else {
    validateRooms();
  }
};

const updateTimeOut = (evt) => {
  timeOut.value = evt.target.value;
};

const updateTimeIn = (evt) => {
  timeIn.value = evt.target.value;
};

titleInput.addEventListener('input', validateTitle);
priceInput.addEventListener('input', validatePrice);
roomsNumber.addEventListener('change', validateRooms);
guestsNumber.addEventListener('change', validateGuests);

typeSelect.addEventListener('change', setMinPricesOfType);
timeIn.addEventListener('change', updateTimeOut);
timeOut.addEventListener('change', updateTimeIn);


function adFormSubmit(onSuccess, onFail) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        adForm.reset();
        onSuccess();
      },
      () => onFail(),
      new FormData(evt.target),
    );
  });
}

function adFormReset() {
  adForm.addEventListener('reset', (event) => {
    event.preventDefault();
    titleInput.value = '';
    priceInput.value = '';
    priceInput.setAttribute('placeholcer', HOUSING_PRICES.house);
    roomsNumber.value = roomsNumber.querySelector('option[selected]').value;
    guestsNumber.value = roomsNumber.querySelector('option[selected]').value;
    typeSelect.value = typeSelect.querySelector('option[selected]').value;
    timeIn.value = timeIn.querySelector('option[selected]').value;
    timeOut.value = timeOut.querySelector('option[selected]').value;
    descriptionTextarea.value = '';
    featuresCheckboxGroup.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    resetMarker(mainPinMarker, map);
    addressInput.value = getLatLngString(mainPinMarker.getLatLng());
  });
}

function showSubmitSuccess() {
  const successElement = submitSuccessTemplate.content.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(successElement);

  document.body.appendChild(fragment);
}

function showSubmitError() {
  const errorElement = submitErrorTemplate.content.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(errorElement);

  document.body.appendChild(fragment);
}

resetButton.addEventListener('click', () => {
  adForm.reset();
});

export {deactivatePage, activatePage, adFormSubmit, adFormReset, showSubmitSuccess, showSubmitError};


