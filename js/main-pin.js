"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

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

  const onMainPinMouseDown = (evt) => {
    if (window.constant.LEFT_MOUSE_BUTTON.includes(evt.button)) {
      window.page.activatedPage(evt);
    }
  };

  const onMainPinEnterDown = (evt) => {
    if (evt.key === window.constant.ENTER_KEY) {
      evt.preventDefault();
      window.page.activatedPage(evt);
    }
  };

  mapPinMain.addEventListener(`mousedown`, onMainPinMouseDown);
  mapPinMain.addEventListener(`keydown`, onMainPinEnterDown);

  window.mainPin = {
    initialMainPinSettings,
    onMainPinMouseDown,
    onMainPinEnterDown
  };
})();
