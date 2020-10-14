"use strict";

(() => {
  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const adForm = document.querySelector(`.ad-form`);

  const setValidationCapacityHandler = () => {
    if (parseInt(adForm.rooms.value, 10) === 100 && parseInt(adForm.capacity.value, 10) > 0) {
      adForm.capacity.setCustomValidity(`Не для гостей`);
    } else if (parseInt(adForm.rooms.value, 10) < parseInt(adForm.capacity.value, 10)) {
      adForm.capacity.setCustomValidity(`На всех гостей комнат не хватит`);
    } else if (parseInt(adForm.rooms.value, 10) !== 100 && !parseInt(adForm.capacity.value, 10)) {
      adForm.capacity.setCustomValidity(`Для гостей`);
    } else {
      adForm.capacity.setCustomValidity(``);
    }
  };

  const setCapacityDisabled = () => {
    const roomValue = parseInt(adForm.rooms.value, 10);

    Array.from(adForm.capacity.options).forEach((item) => {
      const optionCapacity = parseInt(item.value, 10);

      if (roomValue === 100) {
        item.disabled = !!optionCapacity;
      } else {
        item.disabled = roomValue < optionCapacity || !optionCapacity;
      }
    });
  };

  const setCapacityValue = () => {
    adForm.capacity.value = adForm.rooms.value < 100 ? adForm.rooms.value : 0;
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

  const onTypeChange = () => {
    adForm.price.min = minPrice[adForm.type.value];
    adForm.price.placeholder = minPrice[adForm.type.value];
  };

  const onAdFormClick = () => {
    setValidationCapacityHandler();
    window.util.checkFormValidation(adForm);

    if (adForm.checkValidity()) {
      adForm.submit();
    }
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    window.util.checkFormValidation(adForm);
    if (adForm.checkValidity()) {
      adForm.submit();
    }
  };

  const onResetForm = (evt) => {
    evt.reset();
  };

  adForm.capacity.addEventListener(`change`, onCapacityChange);

  adForm.rooms.addEventListener(`change`, onRoomsChange);

  adForm.type.addEventListener(`change`, onTypeChange);

  adForm.timein.addEventListener(`change`, onTimeinChange);

  adForm.timeout.addEventListener(`change`, onTimeoutChange);

  adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, onAdFormClick);

  adForm.addEventListener(`submit`, onSubmitForm);

  adForm.addEventListener(`reset`, onResetForm);

  window.form = {
    setCapacityValue,
    setCapacityDisabled,
  };
})();
