"use strict";

const adForm = document.querySelector(`.ad-form`);
const mapFilter = document.querySelector(`.map__filters`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const setValidationCapacityHandler = () => {
  if (parseInt(adForm.rooms.value, 10) === window.constants.MAX_ROOMS && parseInt(adForm.capacity.value, 10) > 0) {
    adForm.capacity.setCustomValidity(`Не для гостей`);
  } else if (parseInt(adForm.rooms.value, 10) < parseInt(adForm.capacity.value, 10)) {
    adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
  } else if (parseInt(adForm.rooms.value, 10) !== window.constants.MAX_ROOMS && !parseInt(adForm.capacity.value, 10)) {
    adForm.capacity.setCustomValidity(`Для гостей`);
  } else {
    adForm.capacity.setCustomValidity(``);
  }
};

const setCapacityDisabled = () => {
  const roomValue = parseInt(adForm.rooms.value, 10);

  Array.from(adForm.capacity.options).forEach((item) => {
    const optionCapacity = parseInt(item.value, 10);

    if (roomValue === window.constants.MAX_ROOMS) {
      item.disabled = !!optionCapacity;
    } else {
      item.disabled = roomValue < optionCapacity || !optionCapacity;
    }
  });
};

const setCapacityValue = () => {
  adForm.capacity.value = adForm.rooms.value < window.constants.MAX_ROOMS ? adForm.rooms.value : 0;
};

const onRoomsChange = () => {
  setCapacityValue();
  setCapacityDisabled();
};

const onCapacityChange = () => {
  setValidationCapacityHandler();
};

const onTimeinChange = () => {
  adForm.timeout.value = adForm.timein.value;
};

const onTimeoutChange = () => {
  adForm.timein.value = adForm.timeout.value;
};

const setPrice = () => {
  adForm.price.min = window.constants.minPrice[adForm.type.value];
  adForm.price.placeholder = window.constants.minPrice[adForm.type.value];
};

const onTypeChange = () => {
  setPrice();
};

const onSubmitClick = () => {
  setValidationCapacityHandler();
  window.util.checkFormValidation(adForm);

  if (adForm.checkValidity()) {
    window.backend.save(window.success.formHandler, window.errors.renderPostPopupMessage, new FormData(adForm));
  }
};

const onSubmit = (evt) => {
  evt.preventDefault();
  window.util.checkFormValidation(adForm);

  if (adForm.checkValidity()) {
    window.backend.save(window.success.formHandler, window.errors.formHandler, new FormData(adForm));
  }
};

const photosReset = () => {
  document.querySelector(`.ad-form-header__preview img`).src = window.constants.AVATAR_SRC;

  if (photoPreview.querySelector(`img`)) {
    photoPreview.querySelector(`img`).remove();
  }
};

const reset = () => {
  photosReset();
  adForm.reset();
  mapFilter.reset();
  window.page.setState(true);
  window.page.deactivated();
};

const onResetClick = (evt) => {
  evt.preventDefault();
  reset();
};

const onResetKeydown = (evt) => {
  evt.preventDefault();
  if (evt.code === window.constants.ENTER_KEY) {
    reset();
  }
};

const setAddress = (x, y) => {
  adForm.address.value = `${x}, ${y}`;
};

const addListenersToFields = () => {
  adForm.capacity.addEventListener(`change`, onCapacityChange);
  adForm.rooms.addEventListener(`change`, onRoomsChange);
  adForm.type.addEventListener(`change`, onTypeChange);
  adForm.timein.addEventListener(`change`, onTimeinChange);
  adForm.timeout.addEventListener(`change`, onTimeoutChange);
  adForm.avatar.addEventListener(`change`, window.upload.onChangeAvatar);
  adForm.images.addEventListener(`change`, window.upload.onChangePhoto);
};

const removeListenersFromFields = () => {
  adForm.capacity.removeEventListener(`change`, onCapacityChange);
  adForm.rooms.removeEventListener(`change`, onRoomsChange);
  adForm.type.removeEventListener(`change`, onTypeChange);
  adForm.timein.removeEventListener(`change`, onTimeinChange);
  adForm.timeout.removeEventListener(`change`, onTimeoutChange);
  adForm.avatar.removeEventListener(`change`, window.upload.onChangeAvatar);
  adForm.images.removeEventListener(`change`, window.upload.onChangePhoto);
};

mapFilter.addEventListener(`change`, window.filters.onChange);

window.form = {
  setCapacityValue,
  setCapacityDisabled,
  onResetClick,
  onResetKeydown,
  reset,
  setPrice,
  setAddress,
  onSubmit,
  onSubmitClick,
  addListenersToFields,
  removeListenersFromFields,
};
