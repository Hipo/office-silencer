const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");
const DEFAULT_THRESHOLD = 4.5;

window.NOISE_THRESHOLD = DEFAULT_THRESHOLD;

slider.oninput = function sliderInput(event) {
  sliderValue.innerText = event.currentTarget.value;
}

slider.onchange = function sliderChange(event) {
  window.NOISE_THRESHOLD = event.currentTarget.value;
}
