"use strict";

const mainPinLocation = window.pin.getPinLocation(window.constants.mainPinLocation, window.constants.mainPinSize);

const setDisabled = (forms, isInactive = true) => {
  forms.forEach((form) => {
    Array.from(form.children).forEach((item) => {
      item.disabled = isInactive;
    });
  });
};

const setState = (isInactive = true) => {
  if (isInactive) {
    window.constants.adForm.classList.add(`ad-form--disabled`);
    window.constants.map.classList.add(`map--faded`);
    window.constants.adForm.querySelector(`.ad-form__submit`).removeEventListener(`click`, window.form.onAdFormSubmitClick);
    window.constants.adForm.removeEventListener(`submit`, window.form.onAdFormSubmit);
    document.querySelector(`.ad-form__reset`).removeEventListener(`click`, window.form.onResetFormClick);
    document.querySelector(`.ad-form__reset`).removeEventListener(`keydown`, window.form.onResetFormKeydown);
  } else {
    window.constants.adForm.classList.remove(`ad-form--disabled`);
    window.constants.map.classList.remove(`map--faded`);
    window.constants.adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, window.form.onAdFormSubmitClick);
    window.constants.adForm.addEventListener(`submit`, window.form.onAdFormSubmit);
    document.querySelector(`.ad-form__reset`).addEventListener(`click`, window.form.onResetFormClick);
    document.querySelector(`.ad-form__reset`).addEventListener(`keydown`, window.form.onResetFormKeydown);
  }

  setDisabled([window.constants.mapFilter, window.constants.adForm], isInactive);
};

const activatedPage = () => {
  setState(false);
  window.util.setInputValue(window.constants.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
  window.form.setCapacityValue();
  window.form.setCapacityDisabled();
  window.form.setPrice();
  window.backend.load(window.success.successDataHandler, window.errors.renderErrorNode);
  window.constants.adForm.title.focus();
  window.constants.adForm.capacity.style.outline = ``;
  window.form.addListenersToFields();
  window.constants.mapPinMain.removeEventListener(`click`, window.mainPin.onMainPinMouseClick);
  window.constants.mapPinMain.removeEventListener(`keydown`, window.mainPin.onMainPinEnterDown);
};

const deactivatedPage = () => {
  setState(true);
  window.map.deletePinsOnMap();
  window.constants.mapPinMain.style.left = window.constants.initialMainPinLocation.X;
  window.constants.mapPinMain.style.top = window.constants.initialMainPinLocation.Y;
  window.util.setInputValue(window.constants.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
  window.form.removeListenersFromFields();
  window.constants.mapPinMain.addEventListener(`click`, window.mainPin.onMainPinMouseClick);
  window.constants.mapPinMain.addEventListener(`keydown`, window.mainPin.onMainPinEnterDown);
};

window.page = {
  activatedPage,
  deactivatedPage,
  setState,
  setDisabled,
};
