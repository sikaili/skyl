

export default function ($_p) {
  let speed = 0.06;
let count1 = 0;
let angle = 0;
let xS = 0;
let sides = 9;
let xx = 0;
let state = -1;
let state1 = -1;
let sound, song;
let fft, peakDetect;
let ampli = 0;
let nos = 0;
let xoff = 0;
let particles = [];
let nn = -1;
let ts = [];
let doubleClick = 0;
let disTouches = 0;
let loading;
let song1;
let link, link1;
let name;
let bigs;
  let i = 0;
  let param = getURLParams();
  let spectrum = fft.analyze();
  let sum = 0;
  let sum1 = 0;
  let i = 500;
  let i = 200;
  let back = constrain(map(sum, 50, 160, 0, 255), 20, 255);
  let e;
  let m = createVector(nos / 2, random(-1, 1));
  let n = createVector(0.5 * windowWidth, 0.5 * windowHeight);
  let t = frameCount;
  const addParticles = _da => {
    if (_da) {
      if (_da == 2) {
        background(0, 40);
        for (let m = 0; m < 17; m++) {
          let newParticle = new Particle(random(width), random(height), random(0, 3), 20);
          particles.push(newParticle)
        }
      } else {
        for (let m = 0; m < 3; m++) {
          let newParticle = new Particle(width / 2, height / 2, random(3, 12), 20);
          particles.push(newParticle)
        }
        count1 += 1;
        if (count1 > 24) {
          particles.splice(0, particles.length - 1);
          for (let n = 0; n < 5; n++) {
            addParticles(2)
          }
          count1 = 0
        }
      }
    } else {
      if (touches.length == 0) {
        for (let m = 0; m < 20; m++) {
          let newParticle = new Particle(mouseX, mouseY, random(1, 3), 20);
          particles.push(newParticle)
        }
      }
      for (let e = 0; e < touches.length; e++) {
        for (let m = 0; m < 20; m++) {
          let newParticle = new Particle(touches[e].x, touches[e].y, random(1, 3), 20);
          particles.push(newParticle)
        }
      }
    }
    if (particles.length > 100) {
      particles.splice(0, 20)
    }
  };
  let m = 0;
  let newParticle = new Particle(random(width), random(height), random(0, 3), 20);
  let m = 0;
  let newParticle = new Particle(width / 2, height / 2, random(3, 12), 20);
  let n = 0;
  let m = 0;
  let newParticle = new Particle(mouseX, mouseY, random(1, 3), 20);
  let e = 0;
  let m = 0;
  let newParticle = new Particle(touches[e].x, touches[e].y, random(1, 3), 20);
  
  function songLoad(sound) {
    song = sound;
    loading = false
  }
  
  $_p.setup = function () {
    $_p.randomSeed(2200);
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect();
    $_p.createCanvas($_p.windowWidth, $_p.windowHeight);
    $_p.stroke(255, 255, 255);
    $_p.strokeWeight(10);
    $_p.textFont('Helvetica');
    $_p.textAlign(CENTER);
    $_p.textSize(230);
    $_p.mouseX = 0.35 * $_p.windowWidth;
    $_p.mouseY = 0.35 * $_p.windowHeight;
    loadSound('assets/hua_aac_80.m4a', songLoad);
    particles[0] = new Particle($_p.random($_p.width), $_p.random($_p.height), 1, 20);
    for (let i = 0; i < 50; i++) {
      particles[i] = new Particle($_p.random($_p.width), $_p.random($_p.height), $_p.random(1, 3), 20)
    }
    $_p.frameRate(30);
    name = 'SL';
    let param = $_p.getURLParams();
    if (param.name) {
      name = param.name
    }
  };
  
  $_p.draw = function () {
    nos = $_p.map($_p.noise(xoff), 0, 1, -2, 2);
    xoff += 0.05;
    let spectrum = fft.analyze();
    let sum = 0;
    let sum1 = 0;
    for (let i = 500; i < 700; i++) {
      sum += spectrum[i]
    }
    sum = sum / 200 * 1.1;
    if (state == 1 || state == 2) {
      sum = 0
    }
    for (let i = 200; i < 400; i++) {
      sum1 += spectrum[i]
    }
    sum1 = sum1 / 200;
    fft.analyze();
    peakDetect.update(fft);
    r = $_p.constrain($_p.millis() / 8 ^ 2, 0, 2000);
    $_p.stroke($_p.random(0, r), $_p.random(0, r), $_p.random(0, r));
    if (peakDetect.isDetected) {
      addParticles(1, sum1);
      nn = 1;
      $_p.stroke($_p.random(800), 50, 50);
      if ($_p.random(0, 1) > 0.5) {
        $_p.background(0, 100, 150)
      } else {
        $_p.background(0)
      }
    } else {
      nn = -1;
      if (state == 0 && state1 === 0) {
        let back = $_p.constrain($_p.map(sum, 50, 160, 0, 255), 20, 255);
        $_p.stroke(3 * back + 20 + sum + sum1 * $_p.random(20), 3 * back + 20 - sum, 3 * back + 20 - sum, 50 + back * 3);
        $_p.background(255 - $_p.constrain(sum1, 0, 50), 50, 50, back)
      } else {
        $_p.background(25, 50, 180, sum1);
        $_p.fill(0, $_p.map(sum, 85, 110, 0, 255));
        $_p.stroke($_p.random(0, 1600), $_p.random(-255, 255), $_p.random(-255, 255), 180)
      }
    }
    $_p.push();
    for (i = 0; i < particles.length; i++) {
      let e;
      particles[i].separation(particles, sum1, sum, nn);
      let m = $_p.createVector(nos / 2, $_p.random(-1, 1));
      let n = $_p.createVector(0.5 * $_p.windowWidth, 0.5 * $_p.windowHeight);
      particles[i].applyForce(m.mult((sum - sum1 / 5) / 20));
      if (particles[i].mass < 3) {
        particles[i].steering(n, (xS * 1.5 + sum * 1.3) / 50, nn)
      }
      if ($_p.touches.length > 0 || $_p.mouseIsPressed) {
        if ($_p.touches.length > 1) {
          e = $_p.createVector($_p.touches[0].x, $_p.touches[0].y)
        } else {
          e = $_p.createVector($_p.mouseX, $_p.mouseY)
        }
        if (particles[i].mass > 3) {
          particles[i].applyForce($_p.createVector($_p.width / 50, $_p.height / 50))
        }
        particles[i].steering(e, 1, 1, sum1)
      }
      particles[i].bord();
      particles[i].fluide();
      particles[i].update();
      particles[i].display(sum1 / 3, sum1, sum)
    }
    $_p.pop();
    angle += speed;
    $_p.push();
    if (state == -1 || state1 == -1) {
      $_p.fill(0, 180);
      $_p.rect(0, 0, $_p.width, $_p.height);
      $_p.stroke(0, 0);
      $_p.fill(200, 100, 100, (sin($_p.frameCount / 100 * 2 * $_p.PI) + 1) * 80);
      $_p.textSize(36);
      if (loading == false) {
        $_p.text('Double Click to Play the song', 0.5 * $_p.width, $_p.windowHeight * 0.6)
      } else {
        $_p.text('Loading the song...', 0.5 * $_p.windowWidth, $_p.windowHeight * 0.6)
      }
      $_p.textSize(20);
      $_p.textSize(18);
      $_p.fill(150);
      $_p.strokeWeight(0);
      $_p.text('LI Sikai', 0.5 * $_p.windowWidth, 0.3 * $_p.windowHeight);
      $_p.text('2018', 0.5 * $_p.windowWidth, 0.3 * $_p.windowHeight + 30);
      $_p.text('Rain Addiction', 0.5 * $_p.windowWidth, 0.3 * $_p.windowHeight + 130);
      if ($_p.accelerationX > 30 || $_p.accelerationX > 30 || $_p.accelerationX > 30) {
        speed = 0
      }
      $_p.pop()
    }
  };
  
  $_p.touchStarted = function () {
    getAudioContext().state == 'running' ? '' : getAudioContext().resume();
    addParticles();
    $_p.background(0);
    speed = 0;
    state = 1
  };
  
  $_p.windowResized = function () {
    $_p.resizeCanvas($_p.windowWidth, $_p.windowHeight);
    $_p.mouseX = 0.65 * $_p.windowWidth;
    $_p.mouseY = 0.35 * $_p.windowHeight
  };
  
  $_p.touchEnded = function () {
    $_p.background(0);
    speed = 0.075;
    state = 0;
    let t = $_p.frameCount;
    if ($_p.touches.length !== 0) {
      ts = []
    } else {
      ts.push(t)
    }
    if (ts.length > 2) {
      ts.splice(0, 1)
    }
    if (ts[1] - ts[0] < 12) {
      doubleClick = 1
    } else {
      doubleClick = 0
    }
    if (doubleClick == 1 && loading == false) {
      if (song.isPlaying()) {
        count1++
      } else {
        song.play();
        state1 = 0;
        $_p.mouseX = 0.5 * $_p.width;
        $_p.mouseY = 0.4 * $_p.height
      }
    }
  };
  
  $_p.touchMoved = function () {
    speed = -0.04;
    state = 1
  };
}