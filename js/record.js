let song, analyzer, mic;

function preload() {
 // song = loadSound(‘assets/lucky_dragons_-_power_melody.mp3’);
}
function setup() {
 createCanvas(window.innerWidth, window.innerWidth / 3.55);
 // song.loop();
 // Create an Audio input
console.log(p5.AudioIn);

 mic = new p5.AudioIn();
 // start the Audio Input.
 // By default, it does not .connect() (to the computer speakers)
 mic.start();
 // create a new Amplitude analyzer
 // analyzer = new p5.Amplitude();
 // Patch the input to an volume analyzer
 // analyzer.setInput(song);
}
function draw() {
 background(255);
 // Get the average (root mean square) amplitude
 // let rms = analyzer.getLevel();
 let rms = mic.getLevel();

 if (rms> 0.01) {
    console.log(rms * 100);
 }
 fill(127);
 stroke(0);
 // Draw an ellipse with size based on volume
 ellipse(width / 2, height / 2, 100 + rms * 600, 100 + rms * 600);
}
