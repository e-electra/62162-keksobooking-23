const createImageForPreview = (id, container) => {
  const image = document.getElementById(id);

  if (!image) {
    const newImage = document.createElement('img');
    newImage.id = id;
    newImage.width = container.clientWidth;
    newImage.height = container.clientHeight;
    container.appendChild(newImage);
    return newImage;
  }

  image.id = id;
  return image;
};

const updateImageSrc = (file, img) => {
  const reader = new FileReader();

  reader.onloadend = (event) => {
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
};

export {createImageForPreview, updateImageSrc};
