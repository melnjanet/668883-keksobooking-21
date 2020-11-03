"use strict";

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
  errorNode.textContent = setErrorMessage(errorMessage);
  document.body.insertAdjacentElement(`afterbegin`, errorNode);
};

window.errors = {
  renderErrorNode,
  setErrorMessage
};
