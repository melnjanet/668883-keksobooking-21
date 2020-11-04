"use strict";

const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);


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

const onTypeChange = () => {
  window.constants.adForm.price.min = window.constants.minPrice[window.constants.adForm.type.value];
  window.constants.adForm.price.placeholder = window.constants.minPrice[window.constants.adForm.type.value];
};

const setSuccessMessage = () => {
  const successNode = successMessage.cloneNode(true);
  document.body.appendChild(successNode);

  const onEscPress = (evt) => {
    if (evt.code === window.constants.ESC_KEY) {
      evt.preventDefault();
      document.querySelector(`.success`).remove();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  const onClick = (evt) => {
    evt.preventDefault();
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, onClick);
  };

  document.addEventListener(`keydown`, onEscPress);
  document.addEventListener(`click`, onClick);
};

const setErrorMessage = () => {
  const errorNode = errorMessage.cloneNode(true);
  document.body.appendChild(errorNode);

  const onEscPress = (evt) => {
    if (evt.code === window.constants.ESC_KEY) {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  const onClick = (evt) => {
    evt.preventDefault();
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, onClick);
  };

  document.addEventListener(`keydown`, onEscPress);
  document.addEventListener(`click`, onClick);
};

const successHandler = () => {
  window.page.setState(true);
  window.page.deactivatedPage();
  setSuccessMessage();
};

const errorHandler = () => {
  setErrorMessage();
};

const onAdFormSubmitClick = () => {
  setValidationCapacityHandler();
  window.util.checkFormValidation(window.constants.adForm);

  if (window.constants.adForm.checkValidity()) {
    window.backend.save(successHandler, errorHandler, new FormData(window.constants.adForm));
  }
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  window.util.checkFormValidation(window.constants.adForm);

  if (window.constants.adForm.checkValidity()) {
    window.backend.save(successHandler, errorHandler, new FormData(window.constants.adForm));
  }
};

const onResetFormClick = () => {
  window.page.setState(true);
  window.page.deactivatedPage();
};

const onResetFormKeydown = (evt) => {
  if (evt.code === window.constants.ENTER_KEY) {
    window.page.setState(true);
    window.page.deactivatedPage();
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
};

const removeListenersFromFields = () => {
  window.constants.adForm.capacity.removeEventListener(`change`, onCapacityChange);
  window.constants.adForm.rooms.removeEventListener(`change`, onRoomsChange);
  window.constants.adForm.type.removeEventListener(`change`, onTypeChange);
  window.constants.adForm.timein.removeEventListener(`change`, onTimeinChange);
  window.constants.adForm.timeout.removeEventListener(`change`, onTimeoutChange);
};

window.constants.mapFilter.addEventListener(`change`, window.filters.onMapFilterChange);

window.form = {
  setCapacityValue,
  setCapacityDisabled,
  onResetFormClick,
  onResetFormKeydown,
  setAddress,
  onAdFormSubmit,
  onAdFormSubmitClick,
  addListenersToFields,
  removeListenersFromFields,
};
