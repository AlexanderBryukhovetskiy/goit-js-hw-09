//Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

//Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.

import Notiflix from "notiflix";

const form = document.querySelector('.form');
const delay = document.querySelector('input[name = delay]').value;
const step = document.querySelector('input[name = step]').value;
const amount = document.querySelector('input[name = amount]').value;

const submitBtn = document.querySelector('button[type = submit]');

let object = {position, delay};

function createPromise(position, delay) {

     // setTimeout ( () => {
        const shouldResolve = Math.random() > 0.3;

        object.position = position;
        object.delay = delay;

        return new Promise ((resolve, reject) => {
          if (shouldResolve) {
            // Fulfill
            resolve(object);

          } else {
            // Reject
            reject(object);
          }
        })

    //}, delay);
}


createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });


submitBtn.addEventListener('click', onClick);


function onClick () {

  for (let position = 1; position <= amount; position += 1) {
    createPromise();
    delay += step;
  }

  
}


