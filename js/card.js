"use strict";

(() => {
  const ADS_AMOUNT = 8;
  const featuresClasses = {
    wifi: `popup__feature--wifi`,
    dishwasher: `popup__feature--dishwasher`,
    parking: `popup__feature--parking`,
    washer: `popup__feature--washer`,
    elevator: `popup__feature--elevator`,
    conditioner: `popup__feature--conditioner`,
  };
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const fragment = document.createDocumentFragment();

  const createTemplate = (i) => {
    const title = window.data.TITLES[i];
    const type = window.util.getRandomFromArray(window.data.TYPES);
    const checkin = window.util.getRandomFromArray(window.data.CHECK_IN_OUT);
    const checkout = window.util.getRandomFromArray(window.data.CHECK_IN_OUT);
    const features = window.util.getMixArray(window.data.FEATURES);
    const description = window.util.getRandomFromArray(window.data.DESCRIPTIONS);
    const photos = window.util.getMixArray(window.data.PHOTOS);
    const location = {
      x: window.util.getRandomFromNumbers(40, 1160),
      y: window.util.getRandomFromNumbers(130, 630)
    };
    const index = window.util.setLeadingZero(i + 1);

    return {
      author: {
        avatar: `img/avatars/user` + index + `.png`
      },
      offer: {
        title,
        address: location.x + `, ` + location.y,
        price: window.util.getRandomFromNumbers(0, 1000001),
        type,
        rooms: window.util.getRandomFromNumbers(1, 99),
        guests: window.util.getRandomFromNumbers(1, 30),
        checkin,
        checkout,
        features,
        description,
        photos
      },
      location
    };
  };

  const fillAds = (quantity) => {
    const adsList = [];

    for (let i = 0; i < quantity; i++) {
      adsList.push(createTemplate(i));
    }

    return adsList;
  };

  const renderPhotos = (photos, container) => {
    const photoTemplate = container.querySelector(`.popup__photo`);
    let newPhoto;
    container.innerHTML = ``;

    photos.forEach((item) => {
      newPhoto = photoTemplate.cloneNode(false);
      newPhoto.src = item;
      fragment.appendChild(newPhoto);
    });

    container.appendChild(fragment);
  };

  const renderFeatures = (features, container) => {
    container.innerHTML = ``;

    features.forEach((item) => {
      const li = document.createElement(`li`);
      li.classList.add(`popup__feature`, featuresClasses[item]);
      container.appendChild(li);
    });
  };

  const adsList = fillAds(ADS_AMOUNT);

  const setCard = (adsElement) => {
    const cardElement = cardTemplate.cloneNode(true);
    const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = adsElement.offer;
    const roomsWord = window.util.declension([`комната`, `комнаты`, `комнат`], rooms);
    const guestsWord = window.util.declension([`гостя`, `гостей`, `гостей`], guests);

    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).firstChild.textContent = `${price}\u20BD`;
    cardElement.querySelector(`.popup__type`).textContent = window.data.typesOfAccommodation[type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} ${roomsWord} для ${guests} ${guestsWord}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin} выезд до ${checkout}`;
    cardElement.querySelector(`.popup__description`).textContent = description;
    renderFeatures(features, cardElement.querySelector(`.popup__features`));
    renderPhotos(photos, cardElement.querySelector(`.popup__photos`));
    cardElement.querySelector(`.popup__avatar`).src = adsElement.author.avatar;

    return cardElement;
  };

  window.card = {
    adsList,
    setCard
  };
})();
