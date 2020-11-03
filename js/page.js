"use strict";

(() => {
  const mainPinLocation = window.pin.getPinLocation(window.constant.mainPinLocation, window.constant.mainPinSize);

  const setDisabled = (form, isInactive = true) => {
    Array.from(form.children).forEach((item) => {
      item.disabled = isInactive;
    });
  };

  const setState = (isInactive = true) => {
    if (isInactive) {
      window.constant.adForm.classList.add(`ad-form--disabled`);
      window.constant.map.classList.add(`map--faded`);
      window.constant.adForm.querySelector(`.ad-form__submit`).removeEventListener(`click`, window.form.onAdFormSubmitClick);
      window.constant.adForm.removeEventListener(`submit`, window.form.onAdFormSubmit);
      document.querySelector(`.ad-form__reset`).removeEventListener(`click`, window.form.onResetFormClick);
      document.querySelector(`.ad-form__reset`).removeEventListener(`keydown`, window.form.onResetFormKeydown);
    } else {
      window.constant.adForm.classList.remove(`ad-form--disabled`);
      window.constant.map.classList.remove(`map--faded`);
      window.constant.adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, window.form.onAdFormSubmitClick);
      window.constant.adForm.addEventListener(`submit`, window.form.onAdFormSubmit);
      document.querySelector(`.ad-form__reset`).addEventListener(`click`, window.form.onResetFormClick);
      document.querySelector(`.ad-form__reset`).addEventListener(`keydown`, window.form.onResetFormKeydown);
      isInactive = window.constant.pinsData.length ? true : isInactive;
    }

    window.page.setDisabled(window.constant.mapFilter, isInactive);
  };

  const activatedPage = () => {
    setState(false);
    window.util.setInputValue(window.constant.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    window.form.setCapacityValue();
    window.form.setCapacityDisabled();
    window.backend.load(window.success.successHandler, window.errors.renderErrorNode);
    window.constant.adForm.title.focus();
    window.constant.adForm.capacity.style.outline = ``;
    window.form.addListenersToFields();
    window.constant.mapPinMain.removeEventListener(`click`, window.mainPin.onMainPinMouseClick);
    window.constant.mapPinMain.removeEventListener(`keydown`, window.mainPin.onMainPinEnterDown);
  };

  const deactivatedPage = () => {
    setState(true);
    window.constant.adForm.reset();
    window.pin.deletePinsOnMap();
    window.constant.mapPinMain.style.left = window.constant.initialMainPinLocation.X;
    window.constant.mapPinMain.style.top = window.constant.initialMainPinLocation.Y;
    window.util.setInputValue(window.constant.adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
    window.form.removeListenersFromFields();
    window.constant.mapPinMain.addEventListener(`click`, window.mainPin.onMainPinMouseClick);
    window.constant.mapPinMain.addEventListener(`keydown`, window.mainPin.onMainPinEnterDown);
  };

  window.page = {
    activatedPage,
    deactivatedPage,
    setState,
    setDisabled,
  };
})();
