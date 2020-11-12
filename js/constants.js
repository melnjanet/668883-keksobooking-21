"use strict";

const LEFT_MOUSE_BUTTON = [0, 4];
const ENTER_KEY = `Enter`;
const ESC_KEY = `Escape`;
const PIN_POINTER_HEIGHT = 19;
const MAX_PIN_ON_MAP = 5;
const DEBOUNCE_INTERVAL = 500;
const TIMEOUT_IN_MS = 10000;
const MAX_ROOMS = 100;
const OK_STATUS = 200;
const ALL_VALUES = `any`;
const AVATAR_SRC = `img/muffin-grey.svg`;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const mapPinMain = document.querySelector(`.map .map__pin--main`);
let pinsData = [];

const Url = {
  POST: `https://21.javascript.pages.academy/keksobooking`,
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
};

const MapDragArea = {
  Y: {
    TOP: 130,
    BOTTOM: 630,
  },
  X: {
    LEFT: 0,
    RIGHT: 1200,
  },
};

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const PriceLimits = {
  LOW: 10000,
  HIGH: 50000
};

const mainPinSize = {
  width: mapPinMain.offsetWidth,
  height: mapPinMain.offsetHeight,
};

const initialMainPinLocation = {
  X: 570,
  Y: 375,
};

const mainPinLocation = {
  x: mapPinMain.offsetLeft + Math.floor(mainPinSize.width / 2),
  y: mapPinMain.offsetTop + mainPinSize.height + PIN_POINTER_HEIGHT,
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

window.constants = {
  LEFT_MOUSE_BUTTON,
  ENTER_KEY,
  ESC_KEY,
  PIN_POINTER_HEIGHT,
  MAX_PIN_ON_MAP,
  DEBOUNCE_INTERVAL,
  TIMEOUT_IN_MS,
  FILE_TYPES,
  AVATAR_SRC,
  MAX_ROOMS,
  ALL_VALUES,
  OK_STATUS,
  Url,
  MapDragArea,
  minPrice,
  PriceLimits,
  featuresClasses,
  mainPinSize,
  mainPinLocation,
  typesOfAccommodation,
  initialMainPinLocation,
  pinsData,
};
