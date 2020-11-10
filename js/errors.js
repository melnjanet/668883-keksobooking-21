"use strict";

const templateErrorPopup = document.querySelector(`#error`).content.querySelector(`.error`);

const setMessage = (errorStatus) => {
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

const onEscPress = (evt) => {
  evt.preventDefault();

  if (evt.code === window.constants.ESC_KEY && document.contains(document.querySelector(`.error`))) {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onEscPress);
  }
};

const onClick = (evt) => {
  evt.preventDefault();

  if (document.contains(document.querySelector(`.error`))) {
    document.querySelector(`.error`).removeEventListener(`click`, onClick);
    document.querySelector(`.error`).remove();
  }
};

const renderErrorNode = (errorMessage) => {
  const errorNode = document.createElement(`div`);
  errorNode.classList.add(`error`, `error-message`);
  errorNode.textContent = setMessage(errorMessage);
  document.body.insertAdjacentElement(`afterbegin`, errorNode);

  document.addEventListener(`keydown`, onEscPress);
  errorNode.addEventListener(`click`, onClick);
};

const renderPostPopupMessage = () => {
  const errorNode = templateErrorPopup.cloneNode(true);
  document.body.appendChild(errorNode);

  document.addEventListener(`keydown`, onEscPress);
  errorNode.addEventListener(`click`, onClick);
};

window.errors = {
  renderPostPopupMessage,
  renderErrorNode,
};
