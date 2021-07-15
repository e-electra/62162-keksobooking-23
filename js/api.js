function getData(onSuccess, onFail) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch((err) => {
      onFail(err);
    });
}

function sendData(onSuccess, onFail, body) {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onFail();
  });
}

export {getData, sendData};