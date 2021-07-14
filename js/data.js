import { getRandomIntegerInclusive, getRandomFloatInclusive, getRandomArrayElement, createNewRandomArray } from './util.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN_CHECKOUT = [
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

export const SIMILAR_ADVERTISEMENT_COUNT = 10;

const getAvatar = () => {
  const number = getRandomIntegerInclusive(1, 11);
  const userId = number < 10 ? `0${number}` : number;

  return `img/avatars/user${userId}.png`;
};

function getLocationCoords() {
  return {
    lat: getRandomFloatInclusive(35.65000, 35.70000, 5),
    lng: getRandomFloatInclusive(139.70000, 139.80000, 5),
  };
}


const getRentalAdertisementsList = (count) => new Array(count)
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

export { getRentalAdertisementsList };
