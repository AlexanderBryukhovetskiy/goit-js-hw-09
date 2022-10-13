//Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

//Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.

import Notiflix from "notiflix";

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button[type = submit]');

function createPromise(position, delay) {
    return new Promise ((resolve, reject) => {
      setTimeout ( () => {
        const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
          // Fulfill
          resolve({position, delay});
        } else {
          // Reject
          reject({position, delay});
        }
      }, delay);
  });
}

submitBtn.addEventListener('click', onClick);

function onClick (event) {
  event.preventDefault();
  
  let delay = Number(document.querySelector('input[name = delay]').value);
  const step = Number(document.querySelector('input[name = step]').value);
  const amount = Number(document.querySelector('input[name = amount]').value);

  
  
  for (let position = 1; position <= amount; position += 1) {

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }

  setTimeout ( () => { form.reset();}, delay*2);
}



