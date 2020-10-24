"use strict";

(() => {
  const LEFT_MOUSE_BUTTON = [0, 4];
  const ENTER_KEY = `Enter`;
  const ESC_KEY = `Escape`;
  const PIN_POINTER_HEIGHT = 18;
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);

  const mapDragArea = {
    Y: {
      TOP: 130,
      BOTTOM: 630,
    },
    X: {
      LEFT: 0,
      RIGHT: 1200,
    },
  };

  const mainPinSize = {
    width: mapPinMain.offsetWidth,
    height: mapPinMain.offsetHeight,
  };

  const initialMainPinLocation = {
    X: mapPinMain.style.left,
    Y: mapPinMain.style.top,
  };

  const mainPinLocation = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

  const typesOfAccommodation = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const featuresClasses = {
    wifi: `popup__feature--wifi`,
    dishwasher: `popup__feature--dishwasher`,
    parking: `popup__feature--parking`,
    washer: `popup__feature--washer`,
    elevator: `popup__feature--elevator`,
    conditioner: `popup__feature--conditioner`,
  };

  window.constant = {
    LEFT_MOUSE_BUTTON,
    ENTER_KEY,
    ESC_KEY,
    PIN_POINTER_HEIGHT,
    mapDragArea,
    adForm,
    map,
    mapPinMain,
    featuresClasses,
    mainPinSize,
    mainPinLocation,
    typesOfAccommodation,
    initialMainPinLocation,
  };
})();
