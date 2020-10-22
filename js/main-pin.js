"use strict";

(() => {
  const onMainPinEnterDown = (evt) => {
    if (evt.key === window.constant.ENTER_KEY) {
      evt.preventDefault();
      window.page.activatedPage(evt);
    }
  };

  const onMainPinMouseClick = (evt) => {
    if (window.constant.LEFT_MOUSE_BUTTON.includes(evt.button)) {
      evt.preventDefault();
      window.page.activatedPage();
    }
  };

  window.constant.mapPinMain.addEventListener(`mousedown`, window.dragging.draggingMainPin);
  window.constant.mapPinMain.addEventListener(`click`, onMainPinMouseClick);
  window.constant.mapPinMain.addEventListener(`keydown`, onMainPinEnterDown);

  window.mainPin = {
    onMainPinMouseClick,
    onMainPinEnterDown,
  };
})();
