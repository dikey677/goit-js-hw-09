function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

let intervalID = null;

function onBtnStart(e) {
  btnStart.disabled = true;
  btnStop.disabled = false;

  intervalID = setInterval(() => {
    console.log(getRandomHexColor());
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStop(e) {
  clearInterval(intervalID);
  btnStop.disabled = true;
  btnStart.disabled = false;
}
