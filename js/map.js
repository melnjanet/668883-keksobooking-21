"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const mapFilterContainer = map.querySelector(`.map__filters-container`);

  const renderPinsOnMap = (ads) => {
    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(window.pin.setPin(i, ads));
    }

    mapPins.appendChild(fragment);
  };

  const renderCardOnMap = (adsElement) => {
    map.insertBefore(window.card.setCard(adsElement), mapFilterContainer);
  };

  window.map = {
    renderPinsOnMap,
    renderCardOnMap
  };
})();
