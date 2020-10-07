"use strict";

(() => {
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

  const createTemplate = (i) => {
    const title = TITLES[i];
    const type = window.util.getRandomFromArray(TYPES);
    const checkin = window.util.getRandomFromArray(CHECK_IN_OUT);
    const checkout = window.util.getRandomFromArray(CHECK_IN_OUT);
    const features = window.util.getMixArray(FEATURES);
    const description = window.util.getRandomFromArray(DESCRIPTIONS);
    const photos = window.util.getMixArray(PHOTOS);
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

  const adsList = fillAds(ADS_AMOUNT);

  window.data = {
    TITLES,
    TYPES,
    CHECK_IN_OUT,
    FEATURES,
    PHOTOS,
    DESCRIPTIONS,
    typesOfAccommodation,
    adsList
  };
})();