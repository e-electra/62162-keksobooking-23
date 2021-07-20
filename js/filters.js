import { MAX_HOUSING_PRICE, MIN_HOUSING_PRICE, ADVERTISEMENTS_STATE } from './data.js';
import {updateFilteredMarkers, markerGroup} from './map.js';

const FILTERS_VALUES_STATE = {
  housingType: 'any',
  housingPrice: 'any',
  housingRooms: 'any',
  housingGuests: 'any',
  housingFeatures: [],
};

const filtersForm = document.querySelector('.map__filters');
const housingTypeFilter = filtersForm.querySelector('#housing-type');
const housingPriceFilter = filtersForm.querySelector('#housing-price');
const housingRoomsFilter = filtersForm.querySelector('#housing-rooms');
const housingGuestsFilter = filtersForm.querySelector('#housing-guests');
const housingFeaturesFilter = filtersForm.querySelector('#housing-features');
const housingFeaturesCheckBoxGroup = housingFeaturesFilter.querySelectorAll('input[type="checkbox"]');

const onChangeHousingTypeFilter = (event) => {
  const value = event.target.value;
  FILTERS_VALUES_STATE.housingType = value;
};

const onChangeHousingPriceFilter = (event) => {
  FILTERS_VALUES_STATE.housingPrice = event.target.value;
};

const onChangeHousingRoomsFilter = (event) => {
  const value = event.target.value !== 'any' ? Number(event.target.value) : event.target.value;
  FILTERS_VALUES_STATE.housingRooms = value;
};

const onChangeHousingGuestsFilter = (event) => {
  const value = event.target.value !== 'any' ? Number(event.target.value) : event.target.value;
  FILTERS_VALUES_STATE.housingGuests = value;
};

const onChangeFeatureFilter = (event) => {
  const isChecked = event.target.checked;
  const value = event.target.value;
  const valueIdx = FILTERS_VALUES_STATE.housingFeatures.indexOf(value);

  if (!isChecked && valueIdx > -1) {
    FILTERS_VALUES_STATE.housingFeatures.splice(valueIdx, 1);
  } else if (isChecked && valueIdx === -1) {
    FILTERS_VALUES_STATE.housingFeatures.push(value);
  }
};

const setHousingTypeFilter = () => {
  housingTypeFilter.addEventListener('change', onChangeHousingTypeFilter);
};

const setHousingPriceFilter = () => {
  housingPriceFilter.addEventListener('change', onChangeHousingPriceFilter);
};

const setHousingRoomsFilter = () => {
  housingRoomsFilter.addEventListener('change', onChangeHousingRoomsFilter);
};

const setHousingGuestsFilter = () => {
  housingGuestsFilter.addEventListener('change', onChangeHousingGuestsFilter);
};

const setFeaturesFilter = () => {
  housingFeaturesCheckBoxGroup.forEach((checkBox) => {
    checkBox.addEventListener('change', onChangeFeatureFilter);
  });
};

const filterAdverts = (adverts) => {
  const {housingType, housingPrice, housingRooms, housingGuests, housingFeatures} = FILTERS_VALUES_STATE;

  const filterByType = (adv) => {
    if (housingType !== 'any') {
      return adv.offer.type === housingType;
    }
    return true;
  };

  const filterByPrice = (adv) => {
    if (housingPrice !== 'any') {
      if (housingPrice === 'low') {
        return adv.offer.price < MIN_HOUSING_PRICE;
      }
      if (housingPrice === 'middle') {
        return  adv.offer.price >= MIN_HOUSING_PRICE && adv.offer.price < MAX_HOUSING_PRICE;
      }

      return  adv.offer.price >= MAX_HOUSING_PRICE;
    }
    return true;
  };

  const filterByRooms = (adv) => {
    if (housingRooms !== 'any') {
      return adv.offer.rooms === housingRooms;
    }
    return true;
  };

  const filterByGuests = (adv) => {
    if (housingGuests !== 'any') {
      return adv.offer.guests === housingGuests;
    }

    return true;
  };

  const filterByFeatures = (adv) => {
    if (housingFeatures.length > 0) {
      return (adv.offer.features || []).some((feat) => housingFeatures.includes(feat));
    }
    return true;
  };


  return adverts.filter((adv) => filterByType(adv)
    && filterByPrice(adv)
    && filterByRooms(adv)
    && filterByGuests(adv)
    && filterByFeatures(adv));
};

const onChangeFiltersForm = () => {
  const filteredAdverts = filterAdverts(ADVERTISEMENTS_STATE.advertisements);
  updateFilteredMarkers(markerGroup, filteredAdverts);
};

const initFilters = () => {
  setHousingTypeFilter();
  setHousingPriceFilter();
  setHousingRoomsFilter();
  setHousingGuestsFilter();
  setFeaturesFilter();

  filtersForm.addEventListener('change', onChangeFiltersForm);
};

const resetFilters = () => {
  FILTERS_VALUES_STATE.housingType = 'any';
  FILTERS_VALUES_STATE.housingPrice = 'any';
  FILTERS_VALUES_STATE.housingRooms = 'any';
  FILTERS_VALUES_STATE.housingGuests = 'any';
  FILTERS_VALUES_STATE.housingFeatures = [];

  housingTypeFilter.value = 'any';
  housingPriceFilter.value = 'any';
  housingRoomsFilter.value = 'any';
  housingGuestsFilter.value = 'any';
  housingFeaturesCheckBoxGroup.forEach((checkBox) => {
    checkBox.checked = false;
  });

  filtersForm.dispatchEvent(new Event('change'));
};

export {filtersForm, initFilters, filterAdverts, resetFilters};
