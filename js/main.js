const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN_CHECKOUT =[
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_ADVERTISEMENT_COUNT = 10;

function getRandomIntegerInclusive(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительным');
  }

  if ((max - min) < 0) {
    return 0;
  }

  if (min === max) {
    return min;
  }

  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

function getRandomFloatInclusive(min, max, prec) {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительным');
  }

  if ((max - min) < 0) {
    return 0;
  }

  if (min === max) {
    return min;
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(prec));
}

const getAvatar = () => {
  const number = getRandomIntegerInclusive(1, 100);
  const userId = number < 10 ? `0${number}` : number;

  return `img/avatars/user${userId}`;
};

function getRandomArrayElement(elements) {
  return elements[getRandomIntegerInclusive(0, elements.length - 1)];
}

function createNewRandomArray(array) {
  const shuffleArray = () => {
    for (let idx = array.length - 1; idx > 0; idx--) {
      const nextIdx = Math.floor(Math.random() * (idx + 1));
      [array[idx], array[nextIdx]] = [array[nextIdx], array[idx]];
    }
    return array;
  };

  return shuffleArray().slice(getRandomIntegerInclusive(0,array.length - 1));
}

function getLocationCoords() {
  return {
    lat: getRandomFloatInclusive(35.65000, 35.70000, 5),
    lng: getRandomFloatInclusive(139.70000, 139.80000, 5),
  };
}

const getRentalAdertisementsList = () => new Array(SIMILAR_ADVERTISEMENT_COUNT)
  .fill(null)
  .map(() => ({
    author: {
      avatar: getAvatar(),
    },
    offer: {
      title: 'Обьявление о сдаче помещения',
      address: `${getLocationCoords().lat}, ${getLocationCoords().lng}`,
      price: getRandomIntegerInclusive(0, 10000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomIntegerInclusive(1, 4),
      guests: getRandomIntegerInclusive(1, 8),
      checkin: getRandomArrayElement(TIME_CHECKIN_CHECKOUT),
      checkout: getRandomArrayElement(TIME_CHECKIN_CHECKOUT),
      features: createNewRandomArray(FEATURES),
      description: 'Приглашаем вас посетить наши уютные апартаменты, расположенные в самом центре города!',
      photos: createNewRandomArray(PHOTOS),
    },
    location: getLocationCoords(),
  }));

getRentalAdertisementsList();
