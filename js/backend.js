"use strict";

const url = {
  POST: `https://21.javascript.pages.academy/keksobooking`,
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
};

const TIMEOUT_IN_MS = 10000;

const sendXhrRequest = (method, onLoad, onError, data = null) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {
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

  xhr.timeout = TIMEOUT_IN_MS;

  if (method === `GET`) {
    xhr.open(method, url.GET);
  } else if (method === `POST`) {
    xhr.open(method, url.POST);
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

