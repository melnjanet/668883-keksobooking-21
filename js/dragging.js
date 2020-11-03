"use strict";

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
      x: window.constants.mapPinMain.offsetLeft - shift.x,
      y: window.constants.mapPinMain.offsetTop - shift.y
    };

    const minY = window.constants.mapDragArea.Y.TOP - (window.constants.mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT);
    const maxY = window.constants.mapDragArea.Y.BOTTOM - (window.constants.mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT);
    const minX = window.constants.mapDragArea.X.LEFT - Math.floor(window.constants.mapPinMain.offsetWidth / 2);
    const maxX = window.constants.mapDragArea.X.RIGHT - Math.floor(window.constants.mapPinMain.offsetWidth / 2);

    if (newCoordinates.y >= minY && newCoordinates.y <= maxY) {
      window.constants.mapPinMain.style.top = newCoordinates.y + `px`;
    }

    if (newCoordinates.x >= minX && newCoordinates.x <= maxX) {
      window.constants.mapPinMain.style.left = newCoordinates.x + `px`;
    }

    window.form.setAddress(newCoordinates.x + Math.floor(window.constants.mapPinMain.offsetWidth / 2),
        newCoordinates.y + (window.constants.mapPinMain.offsetHeight + window.constants.PIN_POINTER_HEIGHT));
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
