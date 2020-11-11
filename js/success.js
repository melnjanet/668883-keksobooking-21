"use strict";

const mapFilter = document.querySelector(`.map__filters`);
const templateSuccessPopup = document.querySelector(`#success`).content.querySelector(`.success`);

const dataHandler = (data) => {
  window.constants.pinsData = data;
  if (window.constants.pinsData.length) {
    window.map.renderPins(window.filters.applyAll(window.constants.pinsData));
  } else {
    window.page.setDisabled([mapFilter], true);
  }
};

const setSuccessPopupMessage = () => {
  const successNode = templateSuccessPopup.cloneNode(true);
  document.body.appendChild(successNode);

  const successPopupMessageHandler = (evt) => {
    evt.preventDefault();
    document.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onEscPress);
    document.removeEventListener(`click`, onClick);
  };

  const onEscPress = (evt) => {
    if (evt.code === window.constants.ESC_KEY && document.contains(document.querySelector(`.success`))) {
      successPopupMessageHandler(evt);
    }
  };

  const onClick = (evt) => {
    if (document.contains(document.querySelector(`.success`))) {
      successPopupMessageHandler(evt);
    }
  };

  document.addEventListener(`keydown`, onEscPress);
  document.addEventListener(`click`, onClick);
};

const formHandler = () => {
  window.form.reset();
  setSuccessPopupMessage();
};

window.success = {
  dataHandler,
  formHandler,
};
