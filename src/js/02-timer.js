import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const currentSelectDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;

const dayCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');

let intervalID = null;
let differenceDate = 0;
let currentDateValue = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    currentDateValue = selectedDates[0];
    if (currentDateValue <= new Date()) {
      Notify.success('Please choose a date in the future', { timeout: 3000 });
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(currentSelectDate, options);

btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  intervalID = setInterval(() => {
    differenceDate = currentDateValue - new Date();
    const { days, hours, minutes, seconds } = convertMs(differenceDate);

    if (currentDateValue < new Date() || (seconds, minutes, hours, days) === 0) {
      clearInterval(intervalID);
    }
    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  secondsCount.textContent = seconds;
  minutesCount.textContent = minutes;
  hoursCount.textContent = hours;
  dayCount.textContent = days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
