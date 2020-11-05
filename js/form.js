"use strict";

const photoPreview = document.querySelector(`.ad-form__photo`);

const setValidationCapacityHandler = () => {
  if (parseInt(window.constants.adForm.rooms.value, 10) === 100 && parseInt(window.constants.adForm.capacity.value, 10) > 0) {
    window.constants.adForm.capacity.setCustomValidity(`Не для гостей`);
  } else if (parseInt(window.constants.adForm.rooms.value, 10) < parseInt(window.constants.adForm.capacity.value, 10)) {
    window.constants.adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
  } else if (parseInt(window.constants.adForm.rooms.value, 10) !== 100 && !parseInt(window.constants.adForm.capacity.value, 10)) {
    window.constants.adForm.capacity.setCustomValidity(`Для гостей`);
  } else {
    window.constants.adForm.capacity.setCustomValidity(``);
  }
};

const setCapacityDisabled = () => {
  const roomValue = parseInt(window.constants.adForm.rooms.value, 10);

  Array.from(window.constants.adForm.capacity.options).forEach((item) => {
    const optionCapacity = parseInt(item.value, 10);

    if (roomValue === 100) {
      item.disabled = !!optionCapacity;
    } else {
      item.disabled = roomValue < optionCapacity || !optionCapacity;
    }
  });
};

const setCapacityValue = () => {
  window.constants.adForm.capacity.value = window.constants.adForm.rooms.value < 100 ? window.constants.adForm.rooms.value : 0;
};

const onRoomsChange = () => {
  setCapacityValue();
  setCapacityDisabled();
};

const onCapacityChange = () => {
  setValidationCapacityHandler();
};

const onTimeinChange = () => {
  window.constants.adForm.timeout.value = window.constants.adForm.timein.value;
};

const onTimeoutChange = () => {
  window.constants.adForm.timein.value = window.constants.adForm.timeout.value;
};

const setPrice = () => {
  window.constants.adForm.price.min = window.constants.minPrice[window.constants.adForm.type.value];
  window.constants.adForm.price.placeholder = window.constants.minPrice[window.constants.adForm.type.value];
};

const onTypeChange = () => {
  setPrice();
};

const onAdFormSubmitClick = () => {
  setValidationCapacityHandler();
  window.util.checkFormValidation(window.constants.adForm);

  if (window.constants.adForm.checkValidity()) {
    window.backend.save(window.success.successFormHandler, window.errors.errorFormHandler, new FormData(window.constants.adForm));
  }
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  window.util.checkFormValidation(window.constants.adForm);

  if (window.constants.adForm.checkValidity()) {
    window.backend.save(window.success.successFormHandler, window.errors.errorFormHandler, new FormData(window.constants.adForm));
  }
};

const photosReset = () => {
  document.querySelector(`.ad-form-header__preview img`).src = window.constants.AVATAR_SRC;

  if (photoPreview.querySelector(`img`)) {
    photoPreview.querySelector(`img`).remove();
  }
};

const resetForm = () => {
  photosReset();
  window.constants.adForm.reset();
  window.page.setState(true);
  window.page.deactivatedPage();
};

const onResetFormClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

const onResetFormKeydown = (evt) => {
  evt.preventDefault();
  if (evt.code === window.constants.ENTER_KEY) {
    resetForm();
  }
};

const setAddress = (x, y) => {
  window.constants.adForm.address.value = `${x}, ${y}`;
};

const addListenersToFields = () => {
  window.constants.adForm.capacity.addEventListener(`change`, onCapacityChange);
  window.constants.adForm.rooms.addEventListener(`change`, onRoomsChange);
  window.constants.adForm.type.addEventListener(`change`, onTypeChange);
  window.constants.adForm.timein.addEventListener(`change`, onTimeinChange);
  window.constants.adForm.timeout.addEventListener(`change`, onTimeoutChange);
  window.constants.adForm.avatar.addEventListener(`change`, window.photo.onChangeAvatar);
  window.constants.adForm.images.addEventListener(`change`, window.photo.onChangePhoto);
};

const removeListenersFromFields = () => {
  window.constants.adForm.capacity.removeEventListener(`change`, onCapacityChange);
  window.constants.adForm.rooms.removeEventListener(`change`, onRoomsChange);
  window.constants.adForm.type.removeEventListener(`change`, onTypeChange);
  window.constants.adForm.timein.removeEventListener(`change`, onTimeinChange);
  window.constants.adForm.timeout.removeEventListener(`change`, onTimeoutChange);
  window.constants.adForm.avatar.removeEventListener(`change`, window.photo.onChangeAvatar);
  window.constants.adForm.images.removeEventListener(`change`, window.photo.onChangePhoto);
};

window.constants.mapFilter.addEventListener(`change`, window.filters.onMapFilterChange);

window.form = {
  setCapacityValue,
  setCapacityDisabled,
  onResetFormClick,
  onResetFormKeydown,
  resetForm,
  setPrice,
  setAddress,
  onAdFormSubmit,
  onAdFormSubmitClick,
  addListenersToFields,
  removeListenersFromFields,
};
