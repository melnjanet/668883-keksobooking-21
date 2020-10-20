"use strict";

(() => {
  const LEFT_MOUSE_BUTTON = [0, 4];
  const ENTER_KEY = `Enter`;
  const ESC_KEY = `Escape`;
  const PIN_POINTER_HEIGHT = 16;
  const MAP_AREA_TOP = 130;
  const MAP_AREA_BOTTOM = 630;
  const MAP_AREA_LEFT = 0;
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);

  const initialMainPinSettings = {
    location: {
      x: mapPinMain.offsetLeft,
      y: mapPinMain.offsetTop,
    },
    size: {
      width: mapPinMain.offsetWidth,
      height: mapPinMain.offsetHeight + PIN_POINTER_HEIGHT,
    }
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
    MAP_AREA_TOP,
    MAP_AREA_BOTTOM,
    MAP_AREA_LEFT,
    adForm,
    map,
    mapPinMain,
    featuresClasses,
    initialMainPinSettings,
    typesOfAccommodation
  };
})();
