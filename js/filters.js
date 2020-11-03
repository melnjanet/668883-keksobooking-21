"use strict";

const filterForm = document.querySelector(`.map__filters`);
const housingTypeFilterElement = filterForm.querySelector(`#housing-type`);
const housingPriceFilterElement = filterForm.querySelector(`#housing-price`);
const housingRoomsFilterElement = filterForm.querySelector(`#housing-rooms`);
const housingGuestsFilterElement = filterForm.querySelector(`#housing-guests`);
const filterFormFeaturesElement = filterForm.querySelector(`.map__features`);

const getTypeFilter = (data) => {
  return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
};

const getPriceFilter = (data) => {
  return housingPriceFilterElement.value === `any` ||
    (housingPriceFilterElement.value === `low` && data.offer.price < window.constants.priceLimits.LOW) ||
    (housingPriceFilterElement.value === `middle` && (data.offer.price >= window.constants.priceLimits.LOW && data.offer.price <= window.constants.priceLimits.HIGH) ||
      (housingPriceFilterElement.value === `high` && data.offer.price > window.constants.priceLimits.HIGH));
};

const getRoomsFilter = (data) => {
  return housingRoomsFilterElement.value !== `any` ? +housingRoomsFilterElement.value === data.offer.rooms : true;
};

const getGuestsFilter = (data) => {
  return housingGuestsFilterElement.value !== `any` ? +housingGuestsFilterElement.value === data.offer.guests : true;
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
  return offers.filter((item) => {
    return getTypeFilter(item) &&
      getPriceFilter(item) &&
      getRoomsFilter(item) &&
      getGuestsFilter(item) &&
      getFeaturesFilter(item);
  }).slice(0, window.constants.MAX_PIN_ON_MAP);
};

const onMapFilterChange = () => {
  window.map.deletePinsOnMap();
  window.card.removeCard();
  window.util.debounce(window.map.renderPinsOnMap(window.filters.applyAll(window.constants.pinsData)));
};

window.filters = {
  applyAll,
  onMapFilterChange,
};
