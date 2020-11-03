"use strict";

(() => {
  const successHandler = (data) => {
    window.constant.pinsData = data;
    window.map.renderPinsOnMap(window.filters.applyAll(window.constant.pinsData));
  };

  window.success = {
    successHandler,
  };
})();
