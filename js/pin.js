"use strict";

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pins = [];

const getLocation = (location, pinSizes) => {
  return {
    x: location.x - Math.floor(pinSizes.width / 2),
    y: location.y - pinSizes.height - window.constants.PIN_POINTER_HEIGHT,
  };
};

const set = (ads) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinSizes = {
    width: pinElement.style.width,
    height: pinElement.style.height
  };

  const pinLocation = getLocation(ads.location, pinSizes);

  const onPinClick = () => {
    window.map.renderCard(ads);
  };

  const onPinEnterPress = (evt) => {
    if (evt.code === window.constants.ENTER_KEY) {
      evt.preventDefault();
      window.map.renderCard(ads);
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

window.pin = {
  pins,
  set,
  getLocation,
};
