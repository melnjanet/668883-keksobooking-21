"use strict";

const successHandler = (data) => {
  window.constants.pinsData = data;
  if (window.constants.pinsData.length) {
    window.map.renderPinsOnMap(window.filters.applyAll(window.constants.pinsData));
  } else {
    window.page.setDisabled([window.constants.mapFilter], true);
  }
};

window.success = {
  successHandler,
};
