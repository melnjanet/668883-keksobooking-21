"use strict";

const ADS_AMOUNT = 8;
const LEFT_MOUSE_BUTTON = [0, 4];
const ENTER_KEY = `Enter`;
const TITLES = [
  `Роскошные апартаменты, идеальное место для постоянного проживания `,
  `Дом для отпуска с садом и расскошной террасой`,
  `Уютное бунгало, бирюзово-молочный тёплый океан`,
  `Очаровательная старинная вилла с потрясающим видом на озеро`,
  `Отличные стильные апартаменты, все продумано до мелочей`,
  `Прекрасная светлая квартира с видом на горы в доме Бизнес класса`,
  `Королевская вилла с личным бассейном`,
  `Маленький уютный домик в дали от суеты`
];

const TYPES = [`palace`, `flat`, `house`, `bungalo`];

const CHECK_IN_OUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const DESCRIPTIONS = [
  `Нереально чистое и очень хорошо оборудованное пространство.`,
  `Отличное место для отдыха с семьёй и компанией.`,
  `Тихое место, расслабляющая атмосфера. Вкусные завтраки.`,
  `Потрясающий вариант для романтичного уикенда.`,
  `Всё на высоте, вид из балкона божественный.`,
  `Просторно, уютно. Красивая природа вокруг.`,
  `Удобное расположение. Идеально для того, чтобы оставиться на одну ночь.`,
  `Изумительная атмосфера. Все очень удобно и комфортно.`
];

const typesOfAccommodation = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalo: `Бунгало`,
};

const featuresClasses = {
  wifi: `popup__feature--wifi`,
  dishwasher: `popup__feature--dishwasher`,
  parking: `popup__feature--parking`,
  washer: `popup__feature--washer`,
  elevator: `popup__feature--elevator`,
  conditioner: `popup__feature--conditioner`,
};

const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilterContainer = map.querySelector(`.map__filters-container`);
const mapFilters = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const initialMainPinSettings = {
  location: {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  },
  size: {
    width: mapPinMain.offsetWidth,
    height: mapPinMain.offsetHeight
  }
};
let isInactive = true;

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

const createTemplate = (i) => {
  const title = TITLES[i];
  const type = getRandomFromArray(TYPES);
  const checkin = getRandomFromArray(CHECK_IN_OUT);
  const checkout = getRandomFromArray(CHECK_IN_OUT);
  const features = getMixArray(FEATURES);
  const description = getRandomFromArray(DESCRIPTIONS);
  const photos = getMixArray(PHOTOS);
  const location = {
    x: getRandomFromNumbers(40, 1160),
    y: getRandomFromNumbers(130, 630)
  };
  const index = setLeadingZero(i + 1);

  return {
    author: {
      avatar: `img/avatars/user` + index + `.png`
    },
    offer: {
      title,
      address: location.x + `, ` + location.y,
      price: getRandomFromNumbers(0, 1000001),
      type,
      rooms: getRandomFromNumbers(1, 99),
      guests: getRandomFromNumbers(1, 30),
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

const setInputValue = (element, value) => {
  element.value = value;
};


const adsList = fillAds(ADS_AMOUNT);
const fragment = document.createDocumentFragment();

const getPinLocation = (location, pinSizes) => {
  return {
    x: Math.round(location.x + pinSizes.width / 2),
    y: Math.round(location.y + pinSizes.height / 2)
  };
};

const setPin = (i, ads) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinSizes = {
    width: pinElement.style.width,
    height: pinElement.style.height
  };

  const pinLocation = getPinLocation(ads[i].location, pinSizes);
  pinElement.style.left = `${pinLocation.x}px`;
  pinElement.style.top = `${pinLocation.y}px`;
  pinElement.querySelector(`img`).src = ads[i].author.avatar;
  pinElement.querySelector(`img`).alt = ads[i].author.title;

  return pinElement;
};

const setCard = (adsElement) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = adsElement.offer;
  const roomsWord = declension([`комната`, `комнаты`, `комнат`], rooms);
  const guestsWord = declension([`гостя`, `гостей`, `гостей`], guests);

  cardElement.querySelector(`.popup__title`).textContent = title;
  cardElement.querySelector(`.popup__text--address`).textContent = address;
  cardElement.querySelector(`.popup__text--price`).firstChild.textContent = `${price}\u20BD`;
  cardElement.querySelector(`.popup__type`).textContent = typesOfAccommodation[type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} ${roomsWord} для ${guests} ${guestsWord}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin} выезд до ${checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = description;
  renderFeatures(features, cardElement.querySelector(`.popup__features`));
  renderPhotos(photos, cardElement.querySelector(`.popup__photos`));
  cardElement.querySelector(`.popup__avatar`).src = adsElement.author.avatar;

  return cardElement;
};

const renderPinsOnMap = (ads) => {
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(setPin(i, ads));
  }

  mapPins.appendChild(fragment);
};

const renderCardOnMap = (adsElement) => {
  map.insertBefore(setCard(adsElement), mapFilterContainer);
};

const setDisabled = (forms, inactive) => {
  forms.forEach((form) => {
    Array.from(form.children).forEach((item) => {
      item.disabled = inactive;
    });
  });
};

const setState = (inactive) => {
  if (inactive) {
    adForm.classList.add(`ad-form--disabled`);
    map.classList.add(`map--faded`);
  } else {
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
  }

  setDisabled([mapFilters, adForm], inactive);
};

const onMousePressed = (evt) => {
  if (LEFT_MOUSE_BUTTON.includes(evt.button)) {
    activatedPage(evt);
  }
};

const onEnterPress = (evt) => {
  if (evt.key === ENTER_KEY) {
    activatedPage(evt);
  }
};

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

const activatedPage = (evt) => {
  const mainPinLocation = getPinLocation(initialMainPinSettings.location, initialMainPinSettings.size);
  isInactive = false;
  setInputValue(adForm.querySelector(`#address`), `${mainPinLocation.x}, ${mainPinLocation.y}`);
  evt.preventDefault();
  setState(isInactive);
  setCapacityValue();
  setCapacityDisabled();
  adForm.title.focus();
  adForm.capacity.style.outline = ``;
  mapPinMain.removeEventListener(`mousedown`, activatedPage);
  mapPinMain.removeEventListener(`keypress`, activatedPage);
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  onMousePressed(evt);
});

mapPinMain.addEventListener(`keypress`, (evt) => {
  onEnterPress(evt);
});

adForm.rooms.addEventListener(`change`, () => {
  setCapacityValue();
  setCapacityDisabled();
});

adForm.capacity.addEventListener(`change`, () => {
  setValidationCapacityHandler();
});

setState(isInactive);
adForm.querySelector(`.ad-form__submit`).addEventListener(`click`, setValidationCapacityHandler);

renderPinsOnMap(adsList);
renderCardOnMap(adsList[0]);
