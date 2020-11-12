"use strict";

const filterForm = document.querySelector(`.map__filters`);
const housingTypeFilterElement = filterForm.querySelector(`#housing-type`);
const housingPriceFilterElement = filterForm.querySelector(`#housing-price`);
const housingRoomsFilterElement = filterForm.querySelector(`#housing-rooms`);
const housingGuestsFilterElement = filterForm.querySelector(`#housing-guests`);
const filterFormFeaturesElement = filterForm.querySelector(`.map__features`);

const getTypeFilter = (data) => {
  return (housingTypeFilterElement.value === window.constants.ALL_VALUES) || housingTypeFilterElement.value === data.offer.type;
};

const getPriceFilter = (data) => {
  return housingPriceFilterElement.value === window.constants.ALL_VALUES ||
    (housingPriceFilterElement.value === `low` && data.offer.price < window.constants.PriceLimits.LOW) ||
    (housingPriceFilterElement.value === `middle` && (data.offer.price >= window.constants.PriceLimits.LOW && data.offer.price <= window.constants.PriceLimits.HIGH) ||
      (housingPriceFilterElement.value === `high` && data.offer.price > window.constants.PriceLimits.HIGH));
};

const getRoomsFilter = (data) => {
  return housingRoomsFilterElement.value === window.constants.ALL_VALUES || housingRoomsFilterElement.value === data.offer.rooms;
};

const getGuestsFilter = (data) => {
  return housingGuestsFilterElement.value === window.constants.ALL_VALUES || housingGuestsFilterElement.value === data.offer.guests;
};

const getFeaturesFilter = (data) => {
  const checkedFilterFeatures = filterFormFeaturesElement.querySelectorAll(`.map__checkbox:checked`);

  if (checkedFilterFeatures.length === 0) {
    return true;
  }

  let isFeature = true;

  checkedFilterFeatures.forEach((checkedFeature) => {
    if (!data.offer.features.includes(checkedFeature.value)) {
      isFeature = false;
    }
  });

  return isFeature;
};

const applyAll = (offers) => {
  let newArray = [];

  for (let i = 0; newArray.length < window.constants.MAX_PIN_ON_MAP && i < offers.length; i++) {
    if (getTypeFilter(offers[i]) &&
      getPriceFilter(offers[i]) && getRoomsFilter(offers[i]) &&
      getGuestsFilter(offers[i]) && getFeaturesFilter(offers[i])
    ) {
      newArray.push(offers[i]);
    }
  }

  return newArray;
};

const renderFilteredPins = () => {
  window.map.deletePins();
  window.card.remove();
  window.map.renderPins(window.filters.applyAll(window.constants.pinsData));
};

const onChange = () => {
  window.util.debounce(renderFilteredPins);
};

window.filters = {
  applyAll,
  onChange,
};
