"use strict";

const ADS_AMOUNT = 8;

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

const FEATURES = [`wifi`, `dishwasher`, `parking`, `parking`, `elevator`, `conditioner`, `description`];

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

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);

const getRandomFromNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createTemplate = (i) => {
  const title = getRandomFromArray(TITLES);
  const type = getRandomFromArray(TYPES);
  const checkin = getRandomFromArray(CHECK_IN_OUT);
  const checkout = getRandomFromArray(CHECK_IN_OUT);
  const features = getRandomFromArray(FEATURES);
  const description = getRandomFromArray(DESCRIPTIONS);
  const photos = getRandomFromArray(PHOTOS);
  const location = {
    x: getRandomFromNumbers(40, 1160),
    y: getRandomFromNumbers(130, 630)
  };

  return {
    author: {
      avatar: `img/avatars/user` + i + `.png`
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
    const index = quantity < 10 ? `0` + (i + 1) : i + 1;
    adsList.push(createTemplate(index));
  }

  return adsList;
};

const adsList = fillAds(ADS_AMOUNT);
map.classList.remove(`map--faded`);

const fragment = document.createDocumentFragment();

const setPin = (i, ads) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinWidth = pinElement.style.width;
  const pinHeight = pinElement.style.height;

  pinElement.style.left = `${ads[i].location.x + pinWidth / 2}px`;
  pinElement.style.top = `${ads[i].location.y + pinHeight}px`;
  pinElement.querySelector(`img`).src = ads[i].author.avatar;
  pinElement.querySelector(`img`).alt = ads[i].author.title;

  return pinElement;
};

const renderPinsOnMap = (ads) => {
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(setPin(i, ads));
  }

  mapPins.appendChild(fragment);
};

renderPinsOnMap(adsList);
