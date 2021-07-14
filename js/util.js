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

function showAlert(message, timeout) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, timeout);
}

export {
  showAlert,
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getRandomArrayElement,
  createNewRandomArray
};
