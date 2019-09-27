let mic, timeout;

const HEADER_HEIGHT = 70;

let data = [];
const canvasWidth = 340;
const canvasHeight = 70;
const avrOverThresholdClass = "shhh";
const THRESHOLD = 4.5;
const MAX_HAND_BOTTOM = 107;
const handImg = document.querySelector(".finger");
let shouldStopHandAnimation = false;

function preload() {
  // song = loadSound(‘assets/lucky_dragons_-_power_melody.mp3’);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  let noiseLevel = mic.getLevel() * 100;

  data.push(noiseLevel);

  background("rgb(216,17,89)");
  fill(127);
  stroke(0);
  // Draw an ellipse with size based on volume
  ellipse(canvasWidth / 2, canvasHeight / 2, canvasWidth - 20, noiseLevel * 2);

  if (!shouldStopHandAnimation && handImg) {
    if (noiseLevel < 4) {
      handImg.style.bottom = -350;
    } else {
      handImg.style.bottom = generateHandBottomValueFromNoise(noiseLevel);
    }
  }
}

function generateHandBottomValueFromNoise(noise) {
  let bottom = noise /20;

  if (MAX_HAND_BOTTOM > bottom) {
    bottom = MAX_HAND_BOTTOM;
  }

  return bottom;
}

setInterval(() => {
  const avr = data.reduce((sum, item) => sum + item, 0) / data.length || 0;

  // console.log(avr);
  if (avr > THRESHOLD) {
    handImg.style.bottom = MAX_HAND_BOTTOM;
    shouldStopHandAnimation = true;
    document.body.classList.add(avrOverThresholdClass);
  } else {
    shouldStopHandAnimation = false;
    document.body.classList.remove(avrOverThresholdClass);
  }

  data = [];
}, 5000);

function isCanvasHidden() {
  return Array.from(document.body.classList).includes(canvasHiddenClass);
}
