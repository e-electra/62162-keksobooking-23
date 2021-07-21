const popupAdvertsTemplate = document.querySelector('#card').content.querySelector('.popup');

const AdvertTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const renderElement = (el, value, added = true) => {
  if (value && added) {
    el.textContent = value;
  } else {
    el.remove();
  }
};

const createAdvertElement = (ad) => {
  const advertsElement = popupAdvertsTemplate.cloneNode(true);

  renderElement(advertsElement.querySelector('.popup__title'), ad.offer.title);
  renderElement(advertsElement.querySelector('.popup__text--address'), ad.offer.address);
  renderElement(advertsElement.querySelector('.popup__text--price'), `${ad.offer.price} ₽/ночь`, ad.offer.price);
  renderElement(advertsElement.querySelector('.popup__type'), AdvertTypes[ad.offer.type]);

  renderElement(
    advertsElement.querySelector('.popup__text--capacity'),
    `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`,
    ad.offer.rooms && ad.offer.guests,
  );

  renderElement(
    advertsElement.querySelector('.popup__text--time'),
    `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`,
    ad.offer.checkin && ad.offer.checkout,
  );

  const featureListElement = advertsElement.querySelector('.popup__features');
  const featureItemElement = featureListElement.querySelectorAll('.popup__feature');

  if (ad.offer.features && ad.offer.features.length) {
    const modifires = ad.offer.features.map((feature) => `popup__feature--${feature}`);

    featureItemElement.forEach((item) => {
      const modifer = item.classList[1];

      if(!modifires.includes(modifer)) {
        item.remove();
      }
    });
  } else {
    featureListElement.remove();
  }

  renderElement(advertsElement.querySelector('.popup__description'), ad.offer.description);

  const photoList = advertsElement.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');

  if (ad.offer.photos && ad.offer.photos.length) {
    ad.offer.photos.forEach((photo) => {
      const imageElem = photoItem.cloneNode(true);
      imageElem.src = photo;
      photoList.appendChild(imageElem);
    });
    photoItem.remove();
  } else {
    photoList.remove();
  }

  if (ad.author.avatar) {
    advertsElement.querySelector('.popup__avatar').src = ad.author.avatar;
  }

  return advertsElement;
};

export {createAdvertElement};
