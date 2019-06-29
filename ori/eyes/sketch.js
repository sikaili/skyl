p5.disableFriendlyErrors = true;
document.addEventListener('ontouchmove', function (e) {
  e.preventDefault();
}, {
  passive: false
});
document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});

let back, backR, letterF, letterFR, eyeF, recS, recF, eyeS, eyeBS;
let video;
let mx, my;
let count = 0;
let xoff = 0;
let yoff = 0;
let state = -1;
let scale1 = 1;
let scale2 = 1.2;
let texts = [];
let mp = [];
let mp1;
let sx = 150;
let sy = 150;
let number;
let count1 = -1;
let count0 = -1;
let black = [];
let sound = [];
let soundR = [];
let loading = true;
let loading1 = true;
let loading2 = true;
let reverse1 = 0;
let canvasID;

function preload() {
  table = loadTable("assets/hanziDB.csv", "csv", "header");
}

function songLoad(song) {
  count1 += 1;
  sound[count1] = song;
  sound[count1].setVolume(1.0);
  if (count1 == 5) {
    loading1 = false;
  }
}

function songLoadR(song) {
  count0 += 1;
  soundR[count0] = song;
  soundR[count0].setVolume(0);
  if (count0 == 5) {
    loading2 = false;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity() > 2.0 ? pixelDensity(2.0) : '';
  for (var mm = 0; mm < 6; mm++) {
    loadSound('assets/A' + mm + '.m4a', songLoad);
  }
  for (let t = 6; t < 12; t++) {
    loadSound('assets/A' + mm + '.m4a', songLoadR);
  }
  for (let e = 0; e < 5000; e++) {
    let m = split(table.getString(e, 0), ";")
    texts[e] = m[1];
  }
  // pixelDensity(1.0);
  textFont('helvetica');
  if (width < 1500) {
    scale1 = 1500 / width;
  }
  scale2 = 1334 * 750 / (windowWidth * windowHeight) * 1.8;
  if (width > 1600) {
    scale2 = 2;
  };


  sx = sx / scale2;
  sy = sy / scale2;
  mp[0] = {
    x: 0,
    y: 0
  };
  number = Math.ceil(width / sx) * Math.floor(height / sy);
  mouseX = width / 2;
  mouseY = height * 0.3;


}


function draw() {

  if (loading1 == false && loading2 == false) {
    loading = false;
  }
  if (scale2 > 9 || scale2 < 0.3) {
    scale2 = 2;
    sx = 150 / scale2;
    sy = 150 / scale2;
  }

  Color(Math.floor((frameCount / 150) % 3));
  // GeneArray();
  background(back);
  if (state == 1 && Math.random(0, 1) > 0.95) {
    background(backR);
  }
  textSize(140 / scale2);
  fill(letterF);
  RandomBackground();
  // "+""-"
  TraiteArray();

  Eye(width / 2 - 400 / scale1, height / 2 - height * 0.1, "+");
  Eye(width / 2 + 400 / scale1, height / 2 - height * 0.1, "-");
  background(0,150);
}

function Color(x) {
  if (x == 1) {
    back = [8, 61, 169];
    backR = [255, 255, 100];
    letterF = [120, 80, 80];
    letterFS = [120, 80, 80];
    letterFSR = [40, 50, 30];
    letterFR = [0];
    eyeF = [75, 0, 0];
    // eyeF = [4,31,84];
    eyeS = [215, 120, 30];
    eyeBS = [200, 200, 250];
    recS = [0, 0];
    recF = [218, 65, 103];
    reverse1 = 1;

  } else if (x == 0) {
    back = [255];
    backR = [0];
    letterF = [80, 120, 80];
    letterFS = [40, 50, 40];
    letterFSR = [180, 175, 180];
    eyeF = [255];
    eyeS = [40, 50, 40];
    eyeBS = [0];
    letterFR = [255];
    recS = [255];
    recF = [0];
    reverse1 = 0;

  } else if (x == 2) {
    back = [0];
    backR = [255];
    letterF = [80, 120, 80];
    letterFS = [120, 80, 120];
    letterFSR = [40, 50, 40];
    letterFR = [0];
    eyeF = [0];
    eyeS = [250, 200, 250];
    eyeBS = [200, 250, 200];
    recS = [0, 0];
    recF = [250, 200, 250];
    reverse1 = 1;

  }
}

function TraiteArray() {
  push();
  if (mp1) {
    mp = mp1;
  }
  // traite array, draw rect and texts highlight;
  for (let e = 0; e < mp.length; e++) {
    nx = mp[e].x;
    ny = mp[e].y;
    stroke(recS);
    strokeWeight(2);
    fill(recF);
    rect(nx * sx, ny * sy, sx, sy);
    fill(letterFR);
    noStroke();
    textSize(140 / scale2 + Math.random() * 10 / scale2);
    text(texts[Math.floor(width / sx * ny + nx)], nx * sx, (ny + 0.85) * sy);
  }
  pop();
}


function RandomBackground() {
  for (let x = 0; x < width; x += sx) {
    for (let y = 0; y < height; y += sy) {
      if (Math.random() > 0.8) {
        if (noise(sin(frameCount/40+x)) > 0.2) {
          fill(letterFS);
          text(texts[Math.floor(Math.random() * 1000)], x, y + sy * 0.85)
        } else {
          fill(letterFSR);
          text(texts[Math.floor(Math.random() * 200)], x, y + sy * 0.85)

        }
      } else {
        if (Math.random() > 0.99) {
          push();
          noStroke();
          fill(120, 70, 120);
          rect(x, y + sy, sx, sy);
          pop();
        }
        text('我', x, y + sy * 0.85);
      }
    }
  }
}

let flag = false;

function mouseMoved() {
  GeneArray();
}

function GeneArray() {
  if (!keyIsPressed) {
    // if (flag) return;
    const pp = {
      x: Math.floor(Math.abs(mouseX / sx)),
      y: Math.floor(Math.abs(mouseY / sy))
    };
    // let e = p5.Vector.sub(p, mp[mp.length - 1]);
    const dump = mp[mp.length - 1];
    if (pp) {
      let e = (pp.x - dump.x) * (pp.x - dump.x) + (pp.y - dump.y) * (pp.y - dump.y);
      if (e > 0 && pp) {
        let num = Math.floor(Math.random() * 5);
        mp.push(pp);
        // flag = true;
        // Select & Play Sound
        if (loading == false && getAudioContext().state == "running") {
          if (reverse1 == 0) {
            sound[num].pan(map(pp.x, 0, width / sx, -1, 1));
            sound[num].rate((Math.floor((height / sy - pp.y / 2) / 3) + Math.floor(pp.x / 3)) * 0.618);
            sound[num].play();
          } else if (reverse1 == 1) {
            soundR[num].pan(map(pp.x, 0, width / sx, -1, 1));
            // sound[num].rate(map(p.y,0,height/sy,4,-1));
            soundR[num].rate((Math.floor((height / sy - 1 - pp.y / 2) / 3) + Math.floor(pp.x / 3)) * 0.618 * 0.618);
            soundR[num].play();
          }
        }
      }
    }
  }

  // Array Length Control

  // let eee = width*height/(sx*sy)* ((width>1500) ? width*height/(sx*sy)*0.22 : width*height/(sx*sy)*0.22);
  let eee = width * height / (sx * sy) * 0.22;
  if (mp.length > Math.floor(eee)) {
    setTimeout(function () {
      if (mp.length > 4) {
        mp.splice(0, 3)
      }
    }, 1000)
  }
  if (mp.length > width * height / (sx * sy)) {
    mp.splice(width * height / (sx * sy) - 5, 5);
  }
  if (touches.length > 1 || mouseIsPressed) {
    mp.splice(0, 1 + scale2 * scale2);
  }
}

function Eye(x, y, tx) {
  push()
  stroke(eyeS);
  let rr = 120 / scale1;
  let r = 100 / scale1;
  let per = 200 / scale1;
  let ii = 1;
  //touched
  if (state == 1) {
    rr = rr * 1.2;
    r = r * 1.15;
    ii = ii * 1.15
  }
  translate(x, y);
  beginShape();
  vertex(-(PI - 0.1) * per / 2, 0);
  strokeWeight(7);
  //above line
  for (let theta1 = 0.05; theta1 < PI - 0.05; theta1 += 0.2) {
    let n2 = map(Math.sin(frameCount / 20), -1, 1, -5, 5);
    let yy2 = (-rr * 13 / 12) * Math.sin(theta1) + random(-5, 5) / scale1 - abs(mouseY - height / 2) / 60;
    let yy3 = rr * Math.sin(theta1);
    vertex(theta1 * per - (PI - 0.1) * per / 2 + n2, yy2 + n2);
    if (Math.random() > 0.999) {
      vertex(theta1 * per - (PI - 0.1) * per / 2 + n2, yy2 - ((Math.random() + 1) * 20));
    }
    if (Math.random() > 0.98) {
      vertex(theta1 * per - (PI - 0.1) * per / 2 + n2, yy3);
    }
  }
  fill(eyeF);
  for (let theta11 = PI - 0.05; theta11 > 0.05; theta11 -= 0.2) {
    let n21 = map(Math.sin(frameCount / 20), -1, 1, -5, 5);
    let yy21 = (-rr * 13 / 12) * Math.sin(theta11) + random(-5, 5);
    vertex(theta11 * per - (PI - 0.1) * per / 2 + n21, -yy21);
  }
  vertex(-(PI - 0.1) * per / 2, 0);
  endShape();
  // TEXT +-
  textSize(180 / scale1 + Math.random() * 20);
  strokeWeight(20);
  if (Math.random() > 0.7) {
    stroke(eyeS);
  } else {
    stroke(eyeBS);
  }
  text(tx, -20 - (mouseX - width / 2) / 10, -rr - 0.9 * rr / constrain(scale1, 1.3, 100));
  strokeWeight(1);
  noFill();
  beginShape();
  // yoff += 0.01;
  for (let i = 0; i < 2 * PI + 0.01; i += 0.01) {
    stroke(eyeBS);
    // fill(eyeBS);
    //black OUT LINE                                                  
    let n1 = noise(xoff);
    let x1 = r * Math.sin(i) + map(n1, 0, 1, -10, 10) / scale1 + (mouseX - width / 2) / 13;
    let y1 = r * cos(i) + map(n1, 0, 1, -20, 10) / scale1 + (mouseY - height / 2) / 25;
    // y1 = 0;
    // xoff += 0.008;
    vertex(x1, y1);
    // EYE LINES, WHITE SPOT MOVING
    if (Math.random() > 0.4) {
      vertex(x1 / 2.5 * ii + (mouseX - width / 2) / 25, y1 / 2 + (mouseY - height / 2) / 25);
    }
  }
  endShape();
  pop();
}


function touchStarted() {
  if (getAudioContext().state !== "running") {
    masterVolume(0.0, 0.5)
    getAudioContext().resume();
    masterVolume(0.3, 0.5)
  };


  if (mouseX < width / 2 - 400 / scale1 + 60 && mouseX > width / 2 - 400 / scale1 - 60 && mouseY < 0.4 * height + 35 && mouseY > 0.4 * height - 200) {
    scale2 *= 1.5;
    sx = sx / 1.5;
    sy = sy / 1.5;
  }
  if (mouseX < width / 2 + 400 / scale1 + 60 && mouseX > width / 2 + 400 / scale1 - 60 && mouseY < 0.4 * height + 35 && mouseY > 0.4 * height - 200) {
    scale2 /= 1.5;
    sx = sx * 1.5;
    sy = sy * 1.5;
  }
  state = 1;
}

function touchEnded() {
  state = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  link1.position(0.92 * windowWidth - 80, 0.9 * windowHeight + 17)
  link.position(0.92 * windowWidth - 80, 0.9 * windowHeight);
}


function addSnapshot(id) {
  // let dump = mp.map(function (element) {
  //   return {
  //     x: element.x,
  //     y: element.y
  //   }
  // })

  // // console.log(dump);

  // localStorage.setItem("canvas-" + id, JSON.stringify(dump))

}

function removeSnapshot(id) {
  localStorage.removeItem("canvas-" + id);
}


function getSnapshot(id) {
  let canvas = JSON.parse(localStorage.getItem("canvas-" + id));
  return canvas;
}

function resetAllSnapshots() {
  localStorage.clear();
}

document.ontouchmove = function (d) {
  d.preventDefault();
}