"use strict";

(() => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = window.constant.map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const pins = [];

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

  const renderPinsOnMap = (ads) => {
    ads.forEach((item) => {
      fragment.appendChild(setPin(item));
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
    setPin,
    getPinLocation,
    renderPinsOnMap,
    deletePinsOnMap,
  };
})();
