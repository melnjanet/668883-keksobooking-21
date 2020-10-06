"use strict";

(() => {
  const getRandomFromNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getMixArray = (array) => {
    array.sort(() => 0.5 - Math.random());

    return array.slice(getRandomFromNumbers(0, array.length));
  };

  const setLeadingZero = (index) => {
    return index < 10 ? `0${index}` : index;
  };

  const declension = (forms, number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const setInputValue = (element, value) => {
    element.value = value;
  };

  window.util = {
    getRandomFromNumbers,
    getRandomFromArray,
    getMixArray,
    setLeadingZero,
    declension,
    setInputValue
  };
})();
