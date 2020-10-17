"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = map.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const initialMainPinSettings = {
    location: {
      x: mapPinMain.offsetLeft,
      y: mapPinMain.offsetTop,
    },
    size: {
      width: mapPinMain.offsetWidth,
      height: mapPinMain.offsetHeight
    }
  };

  const getPinLocation = (location, pinSizes) => {
    return {
      x: Math.round(location.x + pinSizes.width / 2),
      y: Math.round(location.y + pinSizes.height / 2)
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

    return pinElement;
  };

  const renderPinsOnMap = (ads) => {
    ads.forEach((item) => {
      fragment.appendChild(setPin(item));
    });

    mapPins.appendChild(fragment);
  };

  window.pin = {
    initialMainPinSettings,
    setPin,
    getPinLocation,
    renderPinsOnMap
  };
})();
