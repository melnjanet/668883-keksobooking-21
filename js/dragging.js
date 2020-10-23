"use strict";

(() => {
  const draggingMainPin = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMainPinMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newCoordinates = {
        x: window.constant.mapPinMain.offsetLeft - shift.x,
        y: window.constant.mapPinMain.offsetTop - shift.y
      };

      const minY = window.constant.mapDragArea.Y.TOP - (window.constant.mapPinMain.offsetHeight + window.constant.PIN_POINTER_HEIGHT);
      const maxY = window.constant.mapDragArea.Y.BOTTOM - (window.constant.mapPinMain.offsetHeight + window.constant.PIN_POINTER_HEIGHT);
      const minX = window.constant.mapDragArea.X.LEFT - Math.floor(window.constant.mapPinMain.offsetWidth / 2);
      const maxX = window.constant.mapDragArea.X.RIGHT - Math.floor(window.constant.mapPinMain.offsetWidth / 2);

      if (newCoordinates.y >= minY && newCoordinates.y <= maxY) {
        window.constant.mapPinMain.style.top = newCoordinates.y + `px`;
      }

      if (newCoordinates.x >= minX && newCoordinates.x <= maxX) {
        window.constant.mapPinMain.style.left = newCoordinates.x + `px`;
      }

      window.form.setAddress(newCoordinates.x + Math.floor(window.constant.mapPinMain.offsetWidth / 2),
          newCoordinates.y + (window.constant.mapPinMain.offsetHeight + window.constant.PIN_POINTER_HEIGHT));
    };

    const onMainPinMouseUp = (mouseUpEvt) => {
      mouseUpEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMainPinMouseMove);
      document.removeEventListener(`mouseup`, onMainPinMouseUp);
    };

    document.addEventListener(`mousemove`, onMainPinMouseMove);
    document.addEventListener(`mouseup`, onMainPinMouseUp);
  };

  window.dragging = {
    draggingMainPin,
  };
})();
