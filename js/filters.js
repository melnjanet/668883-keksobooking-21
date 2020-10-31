"use strict";

(() => {
  const mapFilter = document.querySelector(`.map__filters`);
  let changedFeatures = [];

  const check = (offer, checkedValue) => {
    let result = false;

    switch (checkedValue) {
      case `low`:
        result = offer.price < window.constant.priceLimit.LOW;
        break;
      case `middle`:
        result = offer.price >= window.constant.priceLimit.LOW && offer.price < window.constant.priceLimit.HIGH;
        break;
      case `high`:
        result = offer.price >= window.constant.priceLimit.HIGH;
        break;
    }

    return result;
  };

  const filterItem = (item, changed) => {
    let result = true;

    if (changed.value !== `any`) {
      switch (changed.id) {
        case `housing-price`:
          result = check(item, changed.value);
          break;
        case `housing-features`:
          result = changedFeatures.length > 0 ? changedFeatures.every((r)=> item.features.includes(r)) : true;
          break;
        default:
          result = changed.value === item[changed.id.split(`-`)[1]].toString();
      }
    }

    return result;
  };

  const filterOffers = (offers) => {
    return offers.filter((item) => {
      return filterItem(item.offer, mapFilter[`housing-type`])
        && filterItem(item.offer, mapFilter[`housing-price`])
        && filterItem(item.offer, mapFilter[`housing-rooms`])
        && filterItem(item.offer, mapFilter[`housing-guests`])
        && filterItem(item.offer, mapFilter[`housing-features`]);
    });
  };

  const onMapFilterChange = (evt) => {
    window.card.removeCard();
    if (evt.target.name === `features`) {
      if (changedFeatures.indexOf(evt.target.value) === -1 && evt.target.checked === true) {
        changedFeatures.push(evt.target.value);
      } else {
        const featureIndex = changedFeatures.indexOf(evt.target.value);
        changedFeatures.splice(featureIndex, 1);
      }
    }

    window.util.debounce(window.pin.updatePins);
  };
  window.filters = {
    filterOffers,
    onMapFilterChange
  };
})();
