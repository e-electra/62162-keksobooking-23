const submitSuccessTemplate = document.querySelector('#success');
const submitErrorTemplate = document.querySelector('#error');

function removeNotifications() {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  if (successElement) {
    successElement.remove();
  }

  if (errorElement) {
    errorElement.remove();
  }
}


function showSubmitSuccess() {
  const successElement = submitSuccessTemplate.content.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(successElement);

  document.body.appendChild(fragment);
}

function showSubmitError() {
  const errorElement = submitErrorTemplate.content.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(errorElement);

  document.body.appendChild(fragment);
}

function showDataLoadError(message, timeout) {
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

export {removeNotifications, showSubmitSuccess, showSubmitError, showDataLoadError};
