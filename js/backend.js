"use strict";

const sendXhrRequest = (method, onLoad, onError, data = null) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.constants.OK_STATUS) {
      if (method === `GET`) {
        onLoad(xhr.response);
      } else {
        onLoad();
      }
    } else {
      onError(xhr.status);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = window.constants.TIMEOUT_IN_MS;

  if (method === `GET`) {
    xhr.open(method, window.constants.Url.GET);
  } else if (method === `POST`) {
    xhr.open(method, window.constants.Url.POST);
  }

  xhr.send(data);
};

const load = (onLoad, onError) => {
  sendXhrRequest(`GET`, onLoad, onError);
};

const save = (onLoad, onError, data) => {
  sendXhrRequest(`POST`, onLoad, onError, data);
};

window.backend = {
  load,
  save,
};
