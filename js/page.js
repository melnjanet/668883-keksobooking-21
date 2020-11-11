"use strict";
const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const mapFilter = document.querySelector(`.map__filters`);
const mainPinLocation = window.constants.mainPinLocation;

const setDisabled = (forms, isInactive = true) => {
  forms.forEach((form) => {
    Array.from(form.children).forEach((item) => {
      item.disabled = isInactive;
    });
  });
};

const setState = (isInactive = true) => {
  window.util.setInputValue(adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);

  if (isInactive) {
    adForm.classList.add(`ad-form--disabled`);
    map.classList.add(`map--faded`);
    adForm.querySelector(`.ad-form__submit`).removeEventListener(`click`, window.form.onSubmitClick);
    adForm.removeEventListener(`submit`, window.form.onSubmit);
    document.querySelector(`.ad-form__reset`).removeEventListener(`click`, window.form.onResetClick);
    document.querySelector(`.ad-form__reset`).removeEventListener(`keydown`, window.form.onResetKeydown);
  } else {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, window.form.onSubmitClick);
    adForm.addEventListener(`submit`, window.form.onSubmit);
    document.querySelector(`.ad-form__reset`).addEventListener(`click`, window.form.onResetClick);
    document.querySelector(`.ad-form__reset`).addEventListener(`keydown`, window.form.onResetKeydown);
  }

  setDisabled([mapFilter, adForm], isInactive);
};

const activated = () => {
  setState(false);
  window.form.setCapacityValue();
  window.form.setCapacityDisabled();
  window.form.setPrice();
  window.backend.load(window.success.dataHandler, window.errors.renderErrorNode);
  adForm.capacity.style.outline = ``;
  window.form.addListenersToFields();
  mapPinMain.removeEventListener(`mousedown`, window.mainPin.onMouseDown);
  mapPinMain.removeEventListener(`keydown`, window.mainPin.onEnterDown);
};

const deactivated = () => {
  setState(true);
  window.map.deletePins();
  mapPinMain.style.left = window.constants.initialMainPinLocation.X;
  mapPinMain.style.top = window.constants.initialMainPinLocation.Y;
  window.form.removeListenersFromFields();
  mapPinMain.addEventListener(`mousedown`, window.mainPin.onMouseDown);
  mapPinMain.addEventListener(`keydown`, window.mainPin.onEnterDown);
};

window.page = {
  activated,
  deactivated,
  setState,
  setDisabled,
};
