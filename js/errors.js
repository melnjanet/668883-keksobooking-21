"use strict";

const templateErrorPopup = document.querySelector(`#error`).content.querySelector(`.error`);

const setErrorMessage = (errorStatus) => {
  const DEFAULT_ERROR_MESSAGE = `Пожалуйста, перегрузите страницу`;
  let error;

  switch (errorStatus) {
    case 400:
      error = `Неверный запрос. ${DEFAULT_ERROR_MESSAGE}`;
      break;
    case 401:
      error = `Пользователь не авторизован.`;
      break;
    case 403:
      error = `Доступ запрещен.`;
      break;
    case 404:
      error = `Ничего не найдено.`;
      break;
    default:
      error = `${errorStatus}. ${DEFAULT_ERROR_MESSAGE}`;
  }

  return error;
};

const renderErrorNode = (errorMessage) => {
  const errorNode = document.createElement(`div`);
  errorNode.classList.add(`error`, `error-message`);
  errorNode.textContent = setErrorPopupMessage(errorMessage);
  document.body.insertAdjacentElement(`afterbegin`, errorNode);
};

const errorFormHandler = () => {
  setErrorPopupMessage();
};

const setErrorPopupMessage = () => {
  const errorNode = templateErrorPopup.cloneNode(true);
  document.body.appendChild(errorNode);

  const onEscPress = (evt) => {
    if (evt.code === window.constants.ESC_KEY && document.contains(document.querySelector(`.error`))) {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  const onClick = (evt) => {
    if (document.contains(document.querySelector(`.error`))) {
      evt.preventDefault();
      document.querySelector(`.error`).remove();
      document.removeEventListener(`click`, onClick);
    }
  };

  document.addEventListener(`keydown`, onEscPress);
  document.addEventListener(`click`, onClick);
};

window.errors = {
  renderErrorNode,
  setErrorMessage,
  errorFormHandler,
  setErrorPopupMessage,
};
