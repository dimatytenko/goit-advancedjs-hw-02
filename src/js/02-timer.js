import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { convertMs, addLeadingZero } from './helpers/timer.js';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let selectedDate = null;

export const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      refs.startBtn.disabled = true;
      return iziToast.show({
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
    }
    refs.startBtn.disabled = false;
    stopTimer();
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - Date.now()
    );
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.mins.textContent = addLeadingZero(minutes);
    refs.secs.textContent = addLeadingZero(seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      stopTimer();
    }
  }, 1000);

  refs.startBtn.disabled = true;
  refs.input.disabled = true;
}

function stopTimer() {
  clearInterval(intervalId);
  refs.days.textContent = addLeadingZero(0);
  refs.hours.textContent = addLeadingZero(0);
  refs.mins.textContent = addLeadingZero(0);
  refs.secs.textContent = addLeadingZero(0);
}
