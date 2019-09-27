let mic, timeout;

const HEADER_HEIGHT = 70;

let data = [];
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight - HEADER_HEIGHT;
const canvasHiddenClass = "canvas-hidden";
const THRESHOLD = 4.5;

function preload() {
  // song = loadSound(‘assets/lucky_dragons_-_power_melody.mp3’);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255);

  let noiseLevel = mic.getLevel() * 100;

  data.push(noiseLevel);

  fill(127);
  stroke(0);
  // Draw an ellipse with size based on volume
  ellipse(canvasWidth / 2, canvasHeight / 2, canvasWidth - 20, noiseLevel * 2);
}

setInterval(() => {
  const avr = data.reduce((sum, item) => sum + item, 0) / data.length || 0;

  console.log(avr);
  if (avr > THRESHOLD) {
    document.body.classList.add(canvasHiddenClass);
  } else {
    document.body.classList.remove(canvasHiddenClass);
  }

  data = [];
}, 5000);

function isCanvasHidden() {
  return Array.from(document.body.classList).includes(canvasHiddenClass);
}
