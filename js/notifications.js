const submitSuccessTemplate = document.querySelector('#success');
const submitErrorTemplate = document.querySelector('#error');

const onNotificationClickOrEscape = (event) => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');
  const isClickOrEscape = event.type === 'click' || event.key === 'Escape';

  if (successElement && isClickOrEscape) {
    successElement.remove();
  }

  if (errorElement && isClickOrEscape) {
    errorElement.remove();
  }

  document.body.removeEventListener('keyup', onNotificationClickOrEscape);
};


const showSubmitSuccess = () => {
  const successElement = submitSuccessTemplate.content.cloneNode(true);
  const mounted = document.body.appendChild(successElement.firstElementChild);

  mounted.addEventListener('click', onNotificationClickOrEscape);
  document.body.addEventListener('keyup', onNotificationClickOrEscape);
};

const showSubmitError = () => {
  const errorElement = submitErrorTemplate.content.cloneNode(true);
  const mounted = document.body.appendChild(errorElement.firstElementChild);

  mounted.addEventListener('click', onNotificationClickOrEscape);
  document.body.addEventListener('keyup', onNotificationClickOrEscape);
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
