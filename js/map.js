"use strict";

const mapFilterContainer = window.constants.map.querySelector(`.map__filters-container`);

const renderPinsOnMap = (ads) => {
  const mapPins = window.constants.map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  window.util.getRandomFromArray(ads).forEach((item) => {
    fragment.appendChild(window.pin.setPin(item));
  });

  mapPins.appendChild(fragment);
};

const deletePinsOnMap = () => {
  if (window.pin.pins.length > 0) {
    window.pin.pins.forEach((item) => {
      item.remove();
    });
  }
};

const renderCardOnMap = (adsElement) => {
  window.card.removeCard();
  window.constants.map.insertBefore(window.card.setCard(adsElement), mapFilterContainer);
};

window.map = {
  renderPinsOnMap,
  deletePinsOnMap,
  renderCardOnMap,
};
