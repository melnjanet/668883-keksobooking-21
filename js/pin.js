"use strict";

(() => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = window.constant.map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const mapFilter = document.querySelector(`.map__filters`);
  let pinsData = [];
  const pins = [];

  const successHandler = (data) => {
    pinsData = data;

    if (data.length > 0) {
      updatePins(data.length);
      window.page.setDisabled(mapFilter, false);
    } else {
      window.page.setDisabled(mapFilter, true);
    }
  };

  const getPinLocation = (location, pinSizes) => {
    return {
      x: location.x - Math.floor(pinSizes.width / 2),
      y: location.y - pinSizes.height - window.constant.PIN_POINTER_HEIGHT,
    };
  };

  const setPin = (ads) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinSizes = {
      width: pinElement.style.width,
      height: pinElement.style.height
    };

    const pinLocation = getPinLocation(ads.location, pinSizes);

    const onPinClick = () => {
      window.card.renderCardOnMap(ads);
    };

    const onPinEnterPress = (evt) => {
      if (evt.code === window.constant.ENTER_KEY) {
        evt.preventDefault();
        window.card.renderCardOnMap(ads);
      }
    };

    pinElement.style.left = `${pinLocation.x}px`;
    pinElement.style.top = `${pinLocation.y}px`;
    pinElement.querySelector(`img`).src = ads.author.avatar;
    pinElement.querySelector(`img`).alt = ads.author.title;
    pinElement.addEventListener(`click`, onPinClick);
    pinElement.addEventListener(`keydown`, onPinEnterPress);
    pins.push(pinElement);

    return pinElement;
  };

  mapFilter.addEventListener(`change`, window.filters.onMapFilterChange);

  const updatePins = (quantity = window.constant.MAX_PINS_COUNT) => {
    deletePinsOnMap();
    renderPinsOnMap(window.filters.filterOffers(pinsData), quantity);
  };


  const renderPinsOnMap = (ads, quantity) => {
    const takeNumber = ads.length > quantity
      ? quantity
      : ads.length;

    window.util.getRandomFromArray(ads, quantity).forEach((item, index) => {
      if (index < takeNumber) {
        fragment.appendChild(setPin(item));
      }
    });

    mapPins.appendChild(fragment);
  };

  const deletePinsOnMap = () => {
    if (pins.length > 0) {
      pins.forEach((item) => {
        item.remove();
      });
    }
  };

  window.pin = {
    pinsData,
    setPin,
    getPinLocation,
    deletePinsOnMap,
    updatePins,
    successHandler,
  };
})();
