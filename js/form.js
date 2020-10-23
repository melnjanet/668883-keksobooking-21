"use strict";

(() => {
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

  const onAdFormClick = () => {
    setValidationCapacityHandler();
    window.util.checkFormValidation(window.constant.adForm);

    if (window.constant.adForm.checkValidity()) {
      window.constant.adForm.submit();
    }
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    window.util.checkFormValidation(window.constant.adForm);
    if (window.constant.adForm.checkValidity()) {
      window.constant.adForm.submit();
    }
  };

  const onResetForm = (evt) => {
    evt.reset();
  };

  const setAddress = (x, y) => {
    window.constant.adForm.address.value = `${x}, ${y}`;
  };

  window.constant.adForm.capacity.addEventListener(`change`, onCapacityChange);

  window.constant.adForm.rooms.addEventListener(`change`, onRoomsChange);

  window.constant.adForm.type.addEventListener(`change`, onTypeChange);

  window.constant.adForm.timein.addEventListener(`change`, onTimeinChange);

  window.constant.adForm.timeout.addEventListener(`change`, onTimeoutChange);

  window.constant.adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, onAdFormClick);

  window.constant.adForm.addEventListener(`submit`, onSubmitForm);

  window.constant.adForm.addEventListener(`reset`, onResetForm);

  window.form = {
    setCapacityValue,
    setCapacityDisabled,
    setAddress,
  };
})();
