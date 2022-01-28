import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button');

btnSubmit.addEventListener('click', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  let amountNum = Number(amount.value);

  for (let i = 0; i < amountNum; i += 1) {
    let nextDelay = 0;
    let delayNum = Number(delay.value);
    let stepNum = Number(step.value);
    const nextRound = i + 1;
    nextDelay = delayNum + i * stepNum;

    createPromise(nextRound, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { timeout: 10000 });
      })
      .catch(({ position, delay }) => {
        Notify.success(`❌ Rejected promise ${position} in ${delay}ms`, { timeout: 10000 });
      });
  }
}

function createPromise(position, delay) {
  const result = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });

  return result;
}
