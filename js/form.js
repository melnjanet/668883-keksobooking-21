"use strict";

(() => {
  const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const setValidationCapacityHandler = () => {
    if (parseInt(window.constant.adForm.rooms.value, 10) === 100 && parseInt(window.constant.adForm.capacity.value, 10) > 0) {
      window.constant.adForm.capacity.setCustomValidity(`Не для гостей`);
    } else if (parseInt(window.constant.adForm.rooms.value, 10) < parseInt(window.constant.adForm.capacity.value, 10)) {
      window.constant.adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
    } else if (parseInt(window.constant.adForm.rooms.value, 10) !== 100 && !parseInt(window.constant.adForm.capacity.value, 10)) {
      window.constant.adForm.capacity.setCustomValidity(`Для гостей`);
    } else {
      window.constant.adForm.capacity.setCustomValidity(``);
    }
  };

  const setCapacityDisabled = () => {
    const roomValue = parseInt(window.constant.adForm.rooms.value, 10);

    Array.from(window.constant.adForm.capacity.options).forEach((item) => {
      const optionCapacity = parseInt(item.value, 10);

      if (roomValue === 100) {
        item.disabled = !!optionCapacity;
      } else {
        item.disabled = roomValue < optionCapacity || !optionCapacity;
      }
    });
  };

  const setCapacityValue = () => {
    window.constant.adForm.capacity.value = window.constant.adForm.rooms.value < 100 ? window.constant.adForm.rooms.value : 0;
  };

  const onRoomsChange = () => {
    setCapacityValue();
    setCapacityDisabled();
  };

  const onCapacityChange = () => {
    setValidationCapacityHandler();
  };

  const onTimeinChange = () => {
    window.constant.adForm.timeout.value = window.constant.adForm.timein.value;
  };

  const onTimeoutChange = () => {
    window.constant.adForm.timein.value = window.constant.adForm.timeout.value;
  };

  const onTypeChange = () => {
    window.constant.adForm.price.min = minPrice[window.constant.adForm.type.value];
    window.constant.adForm.price.placeholder = minPrice[window.constant.adForm.type.value];
  };

  const setSuccessMessage = () => {
    const successNode = successMessage.cloneNode(true);
    document.body.appendChild(successNode);

    const onEscPress = (evt) => {
      evt.preventDefault();

      if (evt.code === window.constant.ESC_KEY) {
        document.querySelector(`.success`).remove();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    const onClick = (evt) => {
      evt.preventDefault();
      if (evt.code === window.constant.ESC_KEY) {
        document.querySelector(`.success`).remove();
        document.removeEventListener(`click`, onClick);
      }
    };

    document.addEventListener(`keydown`, onEscPress);
    document.addEventListener(`click`, onClick);
  };

  const setErrorMessage = () => {
    const errorNode = errorMessage.cloneNode(true);
    document.body.appendChild(errorNode);

    const onEscPress = (evt) => {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, onEscPress);
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
    window.util.checkFormValidation(window.constant.adForm);

    if (window.constant.adForm.checkValidity()) {
      window.backend.save(successHandler, errorHandler, new FormData(window.constant.adForm));
    }
  };

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();
    window.util.checkFormValidation(window.constant.adForm);

    if (window.constant.adForm.checkValidity()) {
      window.backend.save(successHandler, errorHandler, new FormData(window.constant.adForm));
    }
  };

  const onResetFormClick = () => {
    window.page.setState(true);
    window.page.deactivatedPage();
  };

  const onResetFormKeydown = (evt) => {
    if (evt.code === window.constant.ENTER_KEY) {
      window.page.setState(true);
      window.page.deactivatedPage();
    }
  };

  const setAddress = (x, y) => {
    window.constant.adForm.address.value = `${x}, ${y}`;
  };

  const addListenersToFields = () => {
    window.constant.adForm.capacity.addEventListener(`change`, onCapacityChange);
    window.constant.adForm.rooms.addEventListener(`change`, onRoomsChange);
    window.constant.adForm.type.addEventListener(`change`, onTypeChange);
    window.constant.adForm.timein.addEventListener(`change`, onTimeinChange);
    window.constant.adForm.timeout.addEventListener(`change`, onTimeoutChange);
  };

  const removeListenersFromFields = () => {
    window.constant.adForm.capacity.removeEventListener(`change`, onCapacityChange);
    window.constant.adForm.rooms.removeEventListener(`change`, onRoomsChange);
    window.constant.adForm.type.removeEventListener(`change`, onTypeChange);
    window.constant.adForm.timein.removeEventListener(`change`, onTimeinChange);
    window.constant.adForm.timeout.removeEventListener(`change`, onTimeoutChange);
  };

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
})();
