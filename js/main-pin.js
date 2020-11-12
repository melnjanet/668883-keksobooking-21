"use strict";

const mapPinMain = document.querySelector(`.map .map__pin--main`);

const onEnterDown = (evt) => {
  if (evt.key === window.constants.ENTER_KEY) {
    evt.preventDefault();
    window.page.activated();
  }
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  if (window.constants.LEFT_MOUSE_BUTTON.includes(evt.button)) {
    window.page.activated();
  }
};

mapPinMain.addEventListener(`mousedown`, onMouseDown);
mapPinMain.addEventListener(`mousedown`, window.dragging.movingMainPin);
mapPinMain.addEventListener(`keydown`, onEnterDown);

window.mainPin = {
  onMouseDown,
  onEnterDown,
};
