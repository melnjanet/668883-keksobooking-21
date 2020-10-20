"use strict";

(() => {
  const draggingMainPin = () => {

    window.constant.mapPinMain.addEventListener(`mousedown`, function (evt) {
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


        const minY = window.constant.MAP_AREA_TOP - window.constant.initialMainPinSettings.size.height;
        const maxY = window.constant.MAP_AREA_BOTTOM - window.constant.initialMainPinSettings.size.height;
        const minX = Math.floor(window.constant.MAP_AREA_LEFT - window.constant.mapPinMain.offsetWidth / 2);
        const maxX = Math.floor(window.constant.map.offsetWidth - window.constant.mapPinMain.offsetWidth / 2);

        if (newCoordinates.y >= minY && newCoordinates.y <= maxY) {
          window.constant.mapPinMain.style.top = newCoordinates.y + `px`;
        }

        if (newCoordinates.x >= minX && newCoordinates.x <= maxX) {
          window.constant.mapPinMain.style.left = newCoordinates.x + `px`;
        }

        window.form.setAddress(newCoordinates.x, newCoordinates.y);
      };

      const onMainPinMouseUp = (mouseUpEvt) => {
        mouseUpEvt.preventDefault();

        window.constant.map.removeEventListener(`mousemove`, onMainPinMouseMove);
        window.constant.map.removeEventListener(`mouseup`, onMainPinMouseUp);
      };

      window.constant.map.addEventListener(`mousemove`, onMainPinMouseMove);
      window.constant.map.addEventListener(`mouseup`, onMainPinMouseUp);
    });
  };
  window.dragging = {
    draggingMainPin,
  };
})();
