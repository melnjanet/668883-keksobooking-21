"use strict";

const onMainPinEnterDown = (evt) => {
  if (evt.key === window.constants.ENTER_KEY) {
    evt.preventDefault();
    window.page.activatedPage(evt);
  }
};

const onMainPinMouseClick = (evt) => {
  if (window.constants.LEFT_MOUSE_BUTTON.includes(evt.button)) {
    evt.preventDefault();
    window.page.activatedPage();
  }
};

window.constants.mapPinMain.addEventListener(`mousedown`, window.dragging.draggingMainPin);
window.constants.mapPinMain.addEventListener(`click`, onMainPinMouseClick);
window.constants.mapPinMain.addEventListener(`keydown`, onMainPinEnterDown);

window.mainPin = {
  onMainPinMouseClick,
  onMainPinEnterDown,
};
