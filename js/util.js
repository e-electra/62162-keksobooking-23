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

function getRandomArrayElement(elements) {
  return elements[getRandomIntegerInclusive(0, elements.length - 1)];
}

export {
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getRandomArrayElement
};
