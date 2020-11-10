"use strict";

const mapPinMain = document.querySelector(`.map .map__pin--main`);

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
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    const minY = window.constants.mapDragArea.Y.TOP - (mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT);
    const maxY = window.constants.mapDragArea.Y.BOTTOM - (mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT);
    const minX = window.constants.mapDragArea.X.LEFT - Math.floor(mapPinMain.offsetWidth / 2);
    const maxX = window.constants.mapDragArea.X.RIGHT - Math.floor(mapPinMain.offsetWidth / 2);

    if (newCoordinates.y >= minY && newCoordinates.y <= maxY) {
      mapPinMain.style.top = newCoordinates.y + `px`;
    }

    if (newCoordinates.x >= minX && newCoordinates.x <= maxX) {
      mapPinMain.style.left = newCoordinates.x + `px`;
    }

    window.form.setAddress(newCoordinates.x + Math.floor(mapPinMain.offsetWidth / 2),
        newCoordinates.y + (mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT));
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
