"use strict";

(() => {
  const onMainPinEnterDown = (evt) => {
    if (evt.key === window.constant.ENTER_KEY) {
      evt.preventDefault();
      window.page.activatedPage(evt);
    }
  };

  const onMainPinMouseDown = function (evt) {
    if (window.constant.LEFT_MOUSE_BUTTON.includes(evt.button)) {
      window.page.activatedPage();
      window.constant.mapPinMain.removeEventListener(`mousedown`, onMainPinMouseDown);
      window.constant.mapPinMain.removeEventListener(`keydown`, onMainPinEnterDown);
      window.dragging.draggingMainPin();
    }
  };

  window.mainPin = {
    onMainPinEnterDown,
    onMainPinMouseDown
  };
})();
