const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');

const mapFilters = document.querySelector('.map__filters');
const mapFieldset = mapFilters.querySelector('fieldset');
const mapElements = mapFilters.querySelectorAll('select');


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

export {deactivatePage, activatePage};

const titleInput = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

titleInput.addEventListener('input', (event) => {
  const valueLength = event.target.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const priceInput = adForm.querySelector('#price');
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;

priceInput.addEventListener('input', (event) => {
  const valuePrice = event.target.value;

  if (valuePrice < MIN_PRICE_VALUE) {
    priceInput.setCustomValidity(`Минимальная цена ${MIN_PRICE_VALUE} руб.`);
  } else if (valuePrice > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб.`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const guestsOptions = Array.from(guestsNumber.querySelectorAll('option'))
  .filter((opt) => Number(opt.value) > 0)
  .sort((prev, next) => Number(prev.value) - Number(next.value))
  .map((opt) => opt.innerText);

const roomsHandler = (value) => {
  const guestsValue = Number(guestsNumber.value);

  if (value === 100 && guestsValue > 0) {
    roomsNumber.setCustomValidity(guestsNumber.querySelector('option[value="0"]').innerText);
  } else if (value < guestsValue) {
    roomsNumber.setCustomValidity(
      guestsOptions.slice(0, value).join(' или\n'),
    );
  } else {
    roomsNumber.setCustomValidity('');
  }

  roomsNumber.reportValidity();

};

roomsNumber.addEventListener('change', (event) => {
  roomsHandler(Number(event.target.value));
});


guestsNumber.addEventListener('change', (evt) => {
  const value = Number(evt.target.value);
  const roomsValue = Number(roomsNumber.value);

  if (value <= roomsValue) {
    roomsNumber.setCustomValidity('');
  } else {
    roomsHandler(roomsValue);
  }
});
