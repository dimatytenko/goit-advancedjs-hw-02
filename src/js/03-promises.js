import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { elements } = e.currentTarget;
  let delay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);

  for (let i = 0; i < amount; i += 1) {
    const currentDelay = delay + i * step;
    createPromise(i, currentDelay)
      .then(() => {
        return iziToast.show({
          message: `✅ Fulfilled promise ${i + 1} in ${currentDelay}ms`,
          color: 'green',
          position: 'topRight',
        });
      })
      .catch(() => {
        return iziToast.show({
          message: `❌ Rejected promise ${i + 1} in ${currentDelay}ms`,
          color: 'red',
          position: 'topRight',
        });
      });
  }

  refs.form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
