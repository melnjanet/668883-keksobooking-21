"use strict";
const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const mapFilter = document.querySelector(`.map__filters`);
const {x, y} = window.constants.mainPinLocation;
const {X, Y} = window.constants.initialMainPinLocation;
const {width, height} = window.constants.mainPinSize;

const setDisabled = (forms, isInactive = true) => {
  forms.forEach((form) => {
    Array.from(form.children).forEach((item) => {
      item.disabled = isInactive;
    });
  });
};

const setState = (isInactive = true) => {
  if (isInactive) {
    window.util.setInputValue(adForm.querySelector(`#address`), `${X + Math.floor(width / 2)}, ${Y + Math.floor(height / 2)}`);
    adForm.classList.add(`ad-form--disabled`);
    map.classList.add(`map--faded`);
    adForm.querySelector(`.ad-form__submit`).removeEventListener(`click`, window.form.onSubmitClick);
    adForm.removeEventListener(`submit`, window.form.onSubmit);
    document.querySelector(`.ad-form__reset`).removeEventListener(`click`, window.form.onResetClick);
    document.querySelector(`.ad-form__reset`).removeEventListener(`keydown`, window.form.onResetKeydown);
  } else {
    window.util.setInputValue(adForm.querySelector(`#address`), `${x}, ${y}`);
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
  window.backend.load(window.success.dataHandler, window.errors.renderNode);
  adForm.capacity.style.outline = ``;
  window.form.addListenersToFields();
  mapPinMain.removeEventListener(`mousedown`, window.mainPin.onMouseDown);
  mapPinMain.removeEventListener(`keydown`, window.mainPin.onEnterDown);
};

const deactivated = () => {
  setState(true);
  window.map.deletePins();
  mapPinMain.style.left = `${X}px`;
  mapPinMain.style.top = `${Y}px`;
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
