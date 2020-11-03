"use strict";

let lastTimeout;
const getRandomFromNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomFromArray = (array, n) => {
  return array.sort(() => Math.random() - Math.random()).slice(0, n);
};

const declension = (forms, number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const setInputValue = (element, value) => {
  element.value = value;
};

const checkFieldValidation = (field) => {
  let charsWord = ``;

  if (field.minLength || field.maxLength) {
    charsWord = window.util.declension([`символ`, `символа`, `символов`], field.value.length);
  }

  if (field.required && field.validity.valueMissing) {
    field.setCustomValidity(`Пожалуйста, заполните это поле.`);
  } else if (field.minLength && field.validity.tooShort) {
    field.setCustomValidity(`Пожалуйста введите минимум ${field.minLength} ${charsWord} (введено ${field.value.length} ${charsWord})`);
  } else if (field.maxLength && field.validity.tooShort) {
    field.setCustomValidity(`Пожалуйста введите максимум ${field.maxLength} ${charsWord} (введено ${field.value.length} ${charsWord})`);
  } else if (field.min && field.validity.rangeUnderflow) {
    field.setCustomValidity(`Минимальное значение ${field.min}`);
  } else if (field.max && field.validity.rangeOverflow) {
    field.setCustomValidity(`Максимальное значение ${field.max}`);
  } else {
    field.setCustomValidity(``);
  }
};

const checkFormValidation = (form) => {
  Array.from(form.elements).forEach((item) => {
    checkFieldValidation(item);
  });
};

const debounce = (cb) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }

  lastTimeout = window.setTimeout(cb, window.constants.DEBOUNCE_INTERVAL);
};

window.util = {
  getRandomFromNumbers,
  getRandomFromArray,
  declension,
  setInputValue,
  checkFormValidation,
  debounce,
};
