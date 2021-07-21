const submitSuccessTemplate = document.querySelector('#success');
const submitErrorTemplate = document.querySelector('#error');

const onNotificationKeyup = (event) => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');
  const isEscapeKeyup = event.key === 'Escape';

  if (successElement && isEscapeKeyup) {
    successElement.remove();
  }

  if (errorElement && isEscapeKeyup) {
    errorElement.remove();
  }

  document.body.removeEventListener('keyup', onNotificationKeyup);
};

const onNotificationClick = () => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  if (successElement) {
    successElement.remove();
  }

  if (errorElement) {
    errorElement.remove();
  }
};


const showSubmitSuccess = () => {
  const successElement = submitSuccessTemplate.content.cloneNode(true);
  const mounted = document.body.appendChild(successElement.firstElementChild);

  mounted.addEventListener('click', onNotificationClick);
  document.body.addEventListener('keyup', onNotificationKeyup);
};

const showSubmitError = () => {
  const errorElement = submitErrorTemplate.content.cloneNode(true);
  const mounted = document.body.appendChild(errorElement.firstElementChild);

  mounted.addEventListener('click', onNotificationClick);
  document.body.addEventListener('keyup', onNotificationKeyup);
};

const showDataLoadError = (message, timeout) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.style.zIndex = 100;
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = 0;
  alertContainerElement.style.top = 0;
  alertContainerElement.style.right = 0;
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';
  alertContainerElement.style.color = 'white';

  alertContainerElement.textContent = message;

  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, timeout);
};

export {showSubmitSuccess, showSubmitError, showDataLoadError};
