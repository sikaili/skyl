document.addEventListener('ontouchmove', function (m) {
  m.preventDefault();
}, {
  passive: false
});
document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
let Amp = false;
let count = 0;
let state = -1;
let m = [],
  particles = [];
let t1, t2, ts = [];
let t3;
let amplitude, reverb;
let yofff;
let mic, micLevel;
let force1;
let osc = [],
  filt = [];
let delay;
let doubleClick = false;
let MouseSpeed, mouseP = [];
let song, sound, loading;
let mm;
let x = 0;
let show = true;
let theta = 0;
let notes = [48, 50, 52, 55, 57, 60, 62, 64, 67, 69, 72];
let link, link1;
let texts = ["Frenetically", "Frantically", "Unquietly", "Unsubtly", "Energetically", "Deservedly", "Unreservedly", "Saucily", "Soporifically", "Resignedly", "Unaccountably", "Unsustainable"];
let verbs = ["Consume", "Burn", "Shine", "Mediate", "Converse", "Expand", "Subsume", "Annex", "Exhaust", "Demonstrate", "Install", "Grow", "Incinerate", "Extirpate"];
// let link,link1;
"major pentonic"
// let notes = [48, 51, 55, 54, 59, 60, 63, 64, 67, 68, 72];
// "hua "
let dis = 50;
let noiseBackground = 0;
let noiseXoff = 0;
let filter1;
let masss = [];
let yoff = 0,
  xoff = 0;
let rec = true;
let number;
p5.disableFriendlyErrors = true;

function MouseP() {
  if (rec) {
    let p = createVector(mouseX, mouseY);
    mouseP.push(p);
    if (mouseP.length > 10000) {
      mouseP.splice(0, 1);
    }
  }
}

function setup() {
  pixelDensity() > 2.0 ? pixelDensity(2.0) : "";
  shuffleArray(texts);
  shuffleArray(verbs);
  randomSeed(0);
  number = 10;
  noCursor();
  reverb = new p5.Reverb();
  amplitude = new p5.Amplitude();
  filter1 = new p5.BandPass();
  masterVolume(0.2, 0.05)
  createCanvas(windowWidth, windowHeight);
  delay = new p5.Delay();
  for (let m = 0; m < number; m++) {
    masss[m] = random(0.7, 3.3);
  }
  masss.sort();
  CreateOsc();
  background(150);

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function CreateOsc() {
  osc = [];
  for (let n = 0; n < number; n++) {
    particles[n] = new Particle(random(0, width), random(0, height), masss[n], n);
    osc[n] = new p5.Oscillator();
    osc[n].disconnect();
    osc[n].connect(filter1);
    osc[n].setType('sine');
    osc[n].start();
    t3 = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight + 17)
  link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}

function draw() {
  if ((!t1 || millis() - t1 < 3000) && show) {
    push();
    noStroke();
    fill(200, 155, 255, 30 + random(30, 120) * amplitude.getLevel() * 5);
    textSize(20 + random(-5, 5) * amplitude.getLevel());
    textAlign(CENTER);
    text("Poem : Ryan Dzelzkalns", width / 2, height / 2 + 140);
    text("Code, Music : Sikai Li", width / 2, height / 2 + 170);
    pop();
  }
  if (amplitude.getLevel() > 0.02) {
    push();
    textAlign(CENTER);
    noStroke();
    fill(255, 50 + 1400 * amplitude.getLevel(), 50 + 1400 * amplitude.getLevel(), amplitude.getLevel() * 3 * random(150, 255));
    textSize(100 + random(-45, 45) * amplitude.getLevel());
    if (Math.random() > 0.92) {
      text(verbs[floor(random(8))], width / 2 + random(-50, 50) * amplitude.getLevel(), height / 2 - 99)
    } else {
      text(verbs[(Math.floor((millis() / 3500) % verbs.length))], width / 2 + random(-50, 50) * amplitude.getLevel(), height / 2 - 99);
    }
    if (Math.random() > 0.92) {
      text(texts[Math.floor(random(0, 8))], width / 2 + random(-50, 50) * amplitude.getLevel(), height / 2 + 40);

    } else {
      text(texts[(Math.floor((millis() / 6000) % texts.length))], width / 2 + random(-50, 50) * amplitude.getLevel(), height / 2 + 40);
    }
    pop();
  }
  filter1.freq(constrain(mouseY, 200, 1000))
  if (millis() - t3 > 100000) {
    CreateOsc();
  }
  //   // START STATE
  // if (state == -1){
  //   push()
  //   stroke(0,0)
  //   fill(255,(sin(frameCount/60)+1)*60)
  //   textSize(30)
  //   textAlign(CENTER)
  //   text("Please touch to interact...",0.5*windowWidth,windowHeight-250)
  //   pop()
  // }
  MouseP();
  if (touches.length > 1) {
    MouseSpeed = abs(touches[0].y - touches[1].y) / height * 2;
  }
  micLevel = 0.05 + amplitude.getLevel() / 5 + MouseSpeed;
  background(550 * (amplitude.getLevel()), 250 * amplitude.getLevel(), 100 + amplitude.getLevel() * 3, 50);
  if (amplitude.getLevel() < 0.1) {
    background(0, 1 / amplitude.getLevel()-50);
  }
  dis = (micLevel + 0.006) * (width + height);
  push();
  fill(0, constrain(dis / 4, 0, 100));
  stroke(0, 0, 0, dis);
  strokeWeight(2);
  if (state == 0) {
    ellipse(mouseX, mouseY, dis);
  }
  pop();
  for (let n = 0; n < particles.length; n++) {
    if (state == 0) {
      particles[n].steering(createVector(mouseX, mouseY), 1, dis);
    }
    particles[n].separation(particles);

    // if(n==3){
    //   particles[n].applyForce(createVector(-10,10));
    // }
    // if(n==4){
    //   particles[n].applyForce(createVector(-3,-1.5));
    //   osc[n].disconnect();
    // }
    particles[n].fluide(0.08);
    particles[n].bord();
    particles[n].update();
    particles[n].display(x);
    Sound(osc[n], particles[n]);
    particles[n].sound(osc[n]);
    x += 0.003
  }
}

function touchStarted() {
  t1 = millis();
  setTimeout(function () {
    show = false;
  }, 3000);
  state = 0;
  getAudioContext().state == "running" ? '' : getAudioContext().resume();

}

function touchEnded() {
  state = 1;
  t2 = millis();
  let t = millis();
  if (touches.length !== 0) {
    ts = [];
  } else {
    ts.push(t2);
  }
  if (ts.length > 2) {
    ts.splice(0, 1);
  }
  if (ts[1] - ts[0] < 12) {
    doubleClick = true;
  } else {
    doubleClick = false;
  }
  MouseSpeed = 0;
}
document.ontouchmove = function (m) {
  m.preventDefault();
}