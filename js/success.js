"use strict";

const successHandler = (data) => {
  window.constants.pinsData = data;
  window.map.renderPinsOnMap(window.filters.applyAll(window.constants.pinsData));
};

window.success = {
  successHandler,
};
