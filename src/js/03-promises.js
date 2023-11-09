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

  const promises = [];
  for (let i = 1; i <= amount; i += 1) {
    promises.push(createPromise(i, delay));

    delay += step;
  }

  Promise.allSettled(promises).then(results => {
    results.forEach(result => {
      setTimeout(() => {
        if (result.status === 'rejected') {
          return iziToast.show({
            message: `❌ Rejected promise ${result.reason.position} in ${result.reason.delay}ms`,
            color: 'red',
            position: 'topRight',
          });
        }
        return iziToast.show({
          message: `✅ Fulfilled promise ${result.value.position} in ${result.value.delay}ms`,
          color: 'green',
          position: 'topRight',
        });
      }, result?.value?.delay ?? result.reason.delay);
    });
  });

  refs.form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
