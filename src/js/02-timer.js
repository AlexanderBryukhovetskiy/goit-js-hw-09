/*
// Виконуй це завдання у файлах 02-timer.html і 02-timer.js. 
//Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.

// /+/ Елементи інтефрейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу. 

// /+/ Бібліотека flatpickr
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.
// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css"; 

// /+/ Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.
//<input type="text" id="datetime-picker" />

// /+/ Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.
// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       console.log(selectedDates[0]);
//     },
//   };

// /+/ Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// /+/ Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// /+/  Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// /+/ Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// /+/ Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.
// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

// Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.

//+/ Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
*/

import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css"; 

import Notiflix from "notiflix";

const selectedDates = document.querySelector('input#datetime-picker');

const startCounterBtn  = document.querySelector('[data-start]');
startCounterBtn.disabled = true;

const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');

let ms; // змінна для запису часу відліку у мс

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      
        let currentDate = new Date(); 

        //перевірка дати на валідність (майбутнє):
        if (selectedDates[0] < currentDate ) {
            startCounterBtn.disabled = true;
            //alert("Please choose a date in the future");
            Notiflix.Report.failure('Wrong date!', 'Please choose a date in the future', 'Ok');
            return;
        } 

        console.log("currentDate: ", currentDate);
        console.log('selectedDates[0] : ', selectedDates[0]);
             
        // активація кнопки
        startCounterBtn.disabled = false; 

        //слухач на кнопку
        startCounterBtn.addEventListener('click', onClick);
    }
}

const dataPickr = new flatpickr(selectedDates, options);

function onClick () {
    
    timerId = setInterval( () => {

        let currentDate = new Date();

        // визначення та запис у змінну часу відліку у мс
        ms = dataPickr.selectedDates[0] - currentDate;  
       

            console.log('time to count, ms =', ms);

        const timeForCounter = convertMs(ms);

            
        console.log("It's timeForCounter inside setInterval :", timeForCounter);

        
        //так працює:
        // counterDays.textContent = timeForCounter.days.toString().padStart(2,  0);
        // counterHours.textContent = timeForCounter.hours.toString().padStart(2, 0);
        // counterMinutes.textContent = timeForCounter.minutes.toString().padStart(2, 0);
        // counterSeconds.textContent = timeForCounter.seconds.toString().padStart(2, 0);
        

        // так не працює:
        
        counterDays.textContent = addLeadingZero(timeForCounter.days,  0);
        counterHours.textContent = addLeadingZero(timeForCounter.hours, 0);
        counterMinutes.textContent = addLeadingZero(timeForCounter.minutes, 0);
        counterSeconds.textContent = addLeadingZero(timeForCounter.seconds, 0);

        console.log (addLeadingZero(timeForCounter.days,  0));
       
        if (timeForCounter.days === 0 && timeForCounter.hours === 0 
            && timeForCounter.minutes === 0 && timeForCounter.seconds === 0) {
           
           clearInterval(timerId);
           startCounterBtn.disabled = true;
        }
        
    }, 1000);

}

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
   // console.log("It's inside _convertMs(ms)_ :", { days, hours, minutes, seconds } );

    return { days, hours, minutes, seconds };
  }
  
function addLeadingZero(value, addingSymbols) {
    value = value.toString().padStart(2, addingSymbols)
}





/*
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
*/
