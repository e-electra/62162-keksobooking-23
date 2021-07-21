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
const housePhotoInput = adForm.querySelector('#images');
const housePhotoPreview = adForm.querySelector('.ad-form__photo');

const authorPhotoInput = adForm.querySelector('#avatar');
const authorPhotoPreview = adForm.querySelector('.ad-form-header__preview');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFieldset.setAttribute('disabled', true);

  formElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFieldset.removeAttribute('disabled');

  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapElements.forEach((element) => {
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

const onChangeGuests = () => {
  const guestsValue = Number(guestsNumber.value);
  const roomsValue = Number(roomsNumber.value);

  if (roomsValue < 100 && guestsValue > 0 && guestsValue <= roomsValue) {
    roomsNumber.setCustomValidity('');
  } else {
    onChangeRooms();
  }
};

const onChangeTimeOut = (evt) => {
  timeOut.value = evt.target.value;
};

const onChangeTimeIn = (evt) => {
  timeIn.value = evt.target.value;
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
  const previewImg = container.getElementById(id);
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
    updatePhotoPreview(event.target.files[0], HOUSE_PHOTO_IMG_ID, housePhotoPreview);
  } else {
    resetPhotoPreview(housePhotoPreview, HOUSE_PHOTO_IMG_ID);
  }
};

const onChangeAuthorPhoto = (event) => {
  const file = event.target.files[0];
  const isFileValid = validatePhoto(file, event.target);

  if (isFileValid) {
    updatePhotoPreview(event.target.files[0], AUTHOR_PHOTO_IMG_ID, authorPhotoPreview);
  } else {
    resetPhotoPreview(authorPhotoPreview, AUTHOR_PHOTO_IMG_ID, AUTHOR_PHOTO_IMG_PLACEHOLDER);
  }
};

housePhotoInput.addEventListener('change', onChangeHousePhoto);
authorPhotoInput.addEventListener('change', onChangeAuthorPhoto);

titleInput.addEventListener('input', onChangeTitle);
priceInput.addEventListener('input', onChangePrice);
roomsNumber.addEventListener('change', onChangeRooms);
guestsNumber.addEventListener('change', onChangeGuests);

typeSelect.addEventListener('change', onChangeType);
timeIn.addEventListener('change', onChangeTimeOut);
timeOut.addEventListener('change', onChangeTimeIn);

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

    const authorPreviewImg = document.getElementById(AUTHOR_PHOTO_IMG_ID);
    const housePhotoPreviewImg = document.getElementById(HOUSE_PHOTO_IMG_ID);

    titleInput.value = '';
    priceInput.value = '';
    priceInput.setAttribute('placeholcer', HousingPrices.house);
    roomsNumber.value = roomsNumber.querySelector('option[selected]').value;
    guestsNumber.value = roomsNumber.querySelector('option[selected]').value;
    typeSelect.value = typeSelect.querySelector('option[selected]').value;
    timeIn.value = timeIn.querySelector('option[selected]').value;
    timeOut.value = timeOut.querySelector('option[selected]').value;
    descriptionTextarea.value = '';
    featuresCheckboxGroup.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    housePhotoInput.value = '';
    authorPhotoInput.value = '';
    authorPreviewImg.src = AUTHOR_PHOTO_IMG_PLACEHOLDER;

    if (housePhotoPreviewImg) {
      housePhotoPreviewImg.src = '';
    }

    resetMarker(mainPinMarker, map);
    addressInput.value = getLatLngString(mainPinMarker.getLatLng());

    resetFilters();
  });
};

export {deactivatePage, activatePage, adFormSubmit, adFormReset};


