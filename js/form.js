import { mainPinMarker, map, resetMarker, getLatLngString} from './map.js';
import { sendData } from './api.js';
import {PHOTO_FILE_ALLOWED_TYPES, AUTHOR_PHOTO_IMG_PLACEHOLDER} from './data.js';
import { createImageForPreview, updateImageSrc } from './utils/images.js';
import {resetFilters} from './filters.js';

const HousingPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_PRICE_VALUE = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const HOUSE_PHOTO_IMG_ID = 'house-photo-image';
const AUTHOR_PHOTO_IMG_ID = 'author-photo-image';

const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFiltersElement.querySelector('fieldset');
const mapFiltersControlsElements = mapFiltersElement.querySelectorAll('select');

const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');

const roomsNumberSelect = adForm.querySelector('#room_number');
const guestsNumberSelect = adForm.querySelector('#capacity');
const guestsNumberSelectOptions = Array.from(guestsNumberSelect.querySelectorAll('option'))
  .filter((opt) => Number(opt.value) > 0)
  .sort((prev, next) => Number(prev.value) - Number(next.value))
  .map((opt) => opt.innerText);

const typeSelect = adForm.querySelector('#type');

const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const featuresCheckboxGroup = adForm.querySelector('#features');
const descriptionTextarea = adForm.querySelector('#description');
const addressInput = adForm.querySelector('#address');
const housePhotoInput = adForm.querySelector('#images');
const housePhotoPreviewElement = adForm.querySelector('.ad-form__photo');

const authorPhotoInput = adForm.querySelector('#avatar');
const authorPhotoPreviewElement = adForm.querySelector('.ad-form-header__preview');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');
  mapFiltersFieldset.setAttribute('disabled', true);

  formElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapFiltersControlsElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFiltersFieldset.removeAttribute('disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFiltersControlsElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

// Form validators
const onChangeTitle = (event) => {
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

const onChangeType = (evt) => {
  priceInput.setAttribute('min', HousingPrices[evt.target.value]);
  priceInput.setAttribute('placeholder', HousingPrices[evt.target.value]);
};

const onChangePrice = (event) => {
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

const onChangeRooms = () => {
  const roomsValue = Number(roomsNumberSelect.value);
  const guestsValue = Number(guestsNumberSelect.value);

  if (roomsValue === 100 && guestsValue > 0) {
    roomsNumberSelect.setCustomValidity(guestsNumberSelect.querySelector('option[value="0"]').innerText);
  } else if (roomsValue < guestsValue || guestsValue === 0) {
    roomsNumberSelect.setCustomValidity(
      guestsNumberSelectOptions.slice(0, roomsValue).join(' или\n'),
    );
  } else {
    roomsNumberSelect.setCustomValidity('');
  }

  roomsNumberSelect.reportValidity();
};

const onChangeGuests = () => {
  const guestsValue = Number(guestsNumberSelect.value);
  const roomsValue = Number(roomsNumberSelect.value);

  if (roomsValue < 100 && guestsValue > 0 && guestsValue <= roomsValue) {
    roomsNumberSelect.setCustomValidity('');
  } else {
    onChangeRooms();
  }
};

const onChangeTimeOut = (evt) => {
  timeOutSelect.value = evt.target.value;
};

const onChangeTimeIn = (evt) => {
  timeInSelect.value = evt.target.value;
};

const validatePhoto = (file, input) => {
  if (!PHOTO_FILE_ALLOWED_TYPES.includes(file.type)) {
    input.setCustomValidity('Только файлы .jpg или .png');
    return false;
  } else {
    input.setCustomValidity('');
    return true;
  }
};

const updatePhotoPreview = (file, id, container) => {
  const img = createImageForPreview(id, container);
  updateImageSrc(file, img);
};

const resetPhotoPreview = (container, id, src = '') => {
  const previewImg = container.querySelector(`#${id}`);
  if (previewImg) {
    previewImg.src = src;
    previewImg.width = 40;
    previewImg.height = 44;
  }
};

const onChangeHousePhoto = (event) => {
  const file = event.target.files[0];
  const isFileValid = validatePhoto(file, event.target);

  if (isFileValid) {
    updatePhotoPreview(event.target.files[0], HOUSE_PHOTO_IMG_ID, housePhotoPreviewElement);
  } else {
    resetPhotoPreview(housePhotoPreviewElement, HOUSE_PHOTO_IMG_ID);
  }
};

const onChangeAuthorPhoto = (event) => {
  const file = event.target.files[0];
  const isFileValid = validatePhoto(file, event.target);

  if (isFileValid) {
    updatePhotoPreview(event.target.files[0], AUTHOR_PHOTO_IMG_ID, authorPhotoPreviewElement);
  } else {
    resetPhotoPreview(authorPhotoPreviewElement, AUTHOR_PHOTO_IMG_ID, AUTHOR_PHOTO_IMG_PLACEHOLDER);
  }
};

housePhotoInput.addEventListener('change', onChangeHousePhoto);
authorPhotoInput.addEventListener('change', onChangeAuthorPhoto);

titleInput.addEventListener('input', onChangeTitle);
priceInput.addEventListener('input', onChangePrice);
roomsNumberSelect.addEventListener('change', onChangeRooms);
guestsNumberSelect.addEventListener('change', onChangeGuests);

typeSelect.addEventListener('change', onChangeType);
timeInSelect.addEventListener('change', onChangeTimeOut);
timeOutSelect.addEventListener('change', onChangeTimeIn);

const adFormSubmit = (onSuccess, onFail) => {
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
};

const adFormReset = () => {
  adForm.addEventListener('reset', (event) => {
    event.preventDefault();

    const authorPreviewImg = document.querySelector(`#${AUTHOR_PHOTO_IMG_ID}`);
    const housePhotoPreviewImg = document.querySelector(`#${HOUSE_PHOTO_IMG_ID}`);

    titleInput.value = '';
    priceInput.value = '';
    priceInput.setAttribute('placeholcer', HousingPrices.house);
    roomsNumberSelect.value = roomsNumberSelect.querySelector('option[selected]').value;
    guestsNumberSelect.value = roomsNumberSelect.querySelector('option[selected]').value;
    typeSelect.value = typeSelect.querySelector('option[selected]').value;
    timeInSelect.value = timeInSelect.querySelector('option[selected]').value;
    timeOutSelect.value = timeOutSelect.querySelector('option[selected]').value;
    descriptionTextarea.value = '';
    featuresCheckboxGroup.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    housePhotoInput.value = '';
    authorPhotoInput.value = '';
    authorPreviewImg.src = AUTHOR_PHOTO_IMG_PLACEHOLDER;

    if (housePhotoPreviewImg) {
      housePhotoPreviewImg.remove();
    }

    resetMarker(mainPinMarker, map);
    addressInput.value = getLatLngString(mainPinMarker.getLatLng());

    resetFilters();
  });
};

export {deactivatePage, activatePage, adFormSubmit, adFormReset};


