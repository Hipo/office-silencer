let mic, timeout;

const HEADER_HEIGHT = 70;

let data = [];
const canvasWidth = 400;
const canvasHeight = 70;
const avrOverThresholdClass = "shhh";
const MAX_HAND_BOTTOM = -45;

const handImg = document.querySelector(".finger");
const quoteParag = document.querySelector(".quote");

let shouldStopHandAnimation = false;
const RANDOM_YIGIT_QUOTES = [
  "Arkadaşlar sessiz olalım...",
  "Merhaba kardeşim! Klima için mi geldiniz?",
  "Kahvelerimiz İstanbul'un en iyilerinden...",
  "Yazılım, yüksek konsantrasyon gerektiren bir iş!!",
  "Birine soru soracaksak yanına gidip dürterek değil, Slack üzerinden yapıyoruz.",
  "Çalışma alanında kütüphane kuralları geçerli.",
  "I sleep in the storm 🌪",
  "Ooo gençler!! Keyifler yerinde mi?",
  "Ooo herkes toplanmış...",
  "Ooo kardeşim! Sen Hipo'da mı çalışıyordun?",
  "Arkadaş kim 🧐 Yeni stajyerimiz mi?"
];

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
  fill(255);
  stroke(0);
  // Draw an ellipse with size based on volume
  ellipse(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth - 20,
    noiseLevel * 2
  );

  if (!shouldStopHandAnimation && handImg) {
    if (noiseLevel < 4) {
      handImg.style.bottom = -350;
    } else {
      handImg.style.bottom = generateHandBottomValueFromNoise(noiseLevel);
    }
  }
}

function generateHandBottomValueFromNoise(noise) {
  let bottom = noise / (window.NOISE_THRESHOLD * 4);

  if (MAX_HAND_BOTTOM > bottom) {
    bottom = MAX_HAND_BOTTOM;
  }

  return bottom;
}

setInterval(() => {
  const avr = data.reduce((sum, item) => sum + item, 0) / data.length || 0;

  // console.log(avr);
  if (avr > window.NOISE_THRESHOLD) {
    handImg.style.bottom = MAX_HAND_BOTTOM;
    quoteParag.innerText =
      RANDOM_YIGIT_QUOTES[
        Math.floor(Math.random() * RANDOM_YIGIT_QUOTES.length)
      ];
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
