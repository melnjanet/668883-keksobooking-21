"use strict";
const map = document.querySelector(`.map`);
const mapFilterContainer = map.querySelector(`.map__filters-container`);

const renderPins = (ads) => {
  const mapPins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  window.util.getRandomFromArray(ads).forEach((item) => {
    if (item.hasOwnProperty(`offer`)) {
      fragment.appendChild(window.pin.set(item));
    }
  });

  mapPins.appendChild(fragment);
};

const deletePins = () => {
  if (window.pin.dataArray.length > 0) {
    window.pin.dataArray.forEach((item) => {
      item.remove();
      item.removeEventListener(`click`, window.pin.onPinClick);
      item.addEventListener(`keydown`, window.pin.onPinEnterPress);
    });
  }

  window.card.remove();
};

const renderCard = (adsElement) => {
  window.card.remove();
  map.insertBefore(window.card.set(adsElement), mapFilterContainer);
};

window.map = {
  renderPins,
  deletePins,
  renderCard,
};
