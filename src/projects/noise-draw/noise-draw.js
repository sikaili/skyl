import Tone from 'tone';

const inB = false;
let globleDrawArray = [];
let givenCanvas = null;
let state = 0;
let xoff = 0;
let canvasNumber;
let amplitude;
let drawCount = 0;
let No = 0;
let drawsN = 1;


export default function (sk) {
  sk.settings = {
    name: 'noise-draw',
    list: {
      current: 'OK',
      items: [],
      action: 'getSnapshot',
    },
    actions: [
      {
        name: 'newCanvas',
        icon: 'add',
      },
      // {
      //   name: 'newPartDrawing',
      //   icon: 'add',
      // },
      {
        name: 'removeSnapshot', icon: 'trash',
      }],
  };

  function Draw(d, _m) {
    this.d = d;
    this.mp = [];
    this.rec = false;
    this.yoff = 0;
    this.theta = 0;
    this.mouseI = 0;
    this.m = _m;
    this.count = 0;
    this.mouse = (inB) => {
      if (this.m) {
        if (Math.abs(sk.mouseX - sk.pmouseX) > 0 || Math.abs(sk.mouseY - sk.pmouseY) > 0) {
          for (let i = 0; i < this.m.length; i += 1) {
            this.mp.push(this.m[i]);
          }
          this.m = [];
        }
      } else if (this.rec && !inB && !(sk.mouseX < sk.width / 10 && sk.mouseY < sk.width / 10) && !(sk.mouseX > sk.width * 0.9 && sk.mouseY > sk.height - sk.width * 0.1)) {
        const ee = sk.createVector(sk.mouseX, sk.mouseY);
        if ((Math.abs(sk.mouseX - sk.pmouseX) > 0 || Math.abs(sk.mouseY - sk.pmouseY) > 0) && !sk.keyIsPressed) {
          this.mp.push(ee);
        }
        if (sk.touches.length > 1 || (sk.keyIsPressed && sk.mouseIsPressed)) {
          this.mp.splice(this.mp.length - 1, 1);
        }
      }
    };
    this.display = (_xoff) => {
      sk.push();
      sk.fill(0, 50 + sk.constrain(sk.mouseX - sk.pmouseX, -20, 100) + amplitude * 10);
      sk.strokeWeight(0.8 * (sk.width + sk.height) / 1500 + Math.random() / 3);
      sk.beginShape();
      for (let ee = 0; ee < this.mp.length; ee += 1) {
        this.mouseI = sk.constrain(sk.map(Math.abs(sk.mouseX - sk.width / 2), 0, sk.width / 2, 1, 2), 1.2, 2);
        this.offsett = sk.map(sk.noise(this.yoff * _xoff), 0, 1, -20 * this.mouseI, 20 * this.mouseI) / 3 / 2000 * (sk.width + sk.height);
        sk.vertex(this.mp[ee].x + this.offsett * Math.sin(this.theta), this.mp[ee].y + this.offsett * Math.cos(this.theta) * sk.constrain((sk.mouseY - sk.pmouseY) / 2, 0.5, 800));
        this.yoff += 0.5 * sk.map(sk.mouseY, 0, sk.height, -0.1, 0.1);
        this.theta += 0.01;
      }
      sk.endShape();
      sk.pop();
    };
  }
  let osc;
  let filt;
  let pan;
  let tremolo;

  sk.setup = () => {
    sk.newCanvas();
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.noCursor();
    tremolo = new Tone.JCReverb(0.3);
    pan = new Tone.Panner();
    filt = new Tone.Filter(50, 'bandpass');
    osc = new Tone.OmniOscillator('C#4', 'pwm').chain(new Tone.Volume(-4), filt, pan, tremolo, Tone.Master);
    osc.start();
  };

  sk.updateList = () => {
    sk.settings.list.items = Object.keys(localStorage).filter((name) => name.includes('noise-draw-')).map((name) => name.slice('noise-draw-'.length));
  };

  sk.newCanvas = () => {
    sk.updateList();
    canvasNumber = sk.settings.list.items.length;
    sk.settings.list.current = canvasNumber;
    givenCanvas = null;
    No = 0;
    globleDrawArray = null;
    globleDrawArray = [];
    globleDrawArray[0] = new Draw(0);
    state = 0;
  };

  sk.removeSnapshot = () => {
    const name = sk.settings.list.current;
    if (confirm(`You are about to delete :${name}`)) {
      localStorage.removeItem(`noise-draw-${name}`);
      sk.newCanvas();
    }
    sk.updateList();
  };

  sk.getSnapshot = (localStorageId) => {
    givenCanvas = true;
    const canvas = JSON.parse(localStorage.getItem(`noise-draw-${localStorageId}`));
    if (canvas) {
      canvasNumber = localStorageId;
      sk.settings.list.current = canvasNumber;
      for (let e = 0; e < canvas.length; e += 1) {
        const part = new Draw(e, canvas[e]);
        globleDrawArray[e] = part;
      }
    }
    sk.updateList();
  };

  sk.addSnapshot = (id) => {
    const dumps = [];
    for (let mm = 0; mm < globleDrawArray.length; mm += 1) {
      const dump = globleDrawArray[mm].mp.map((element) => ({ x: +element.x, y: +element.y }));
      dumps.push(dump);
    }
    if (globleDrawArray[0].mp.length > 30 && givenCanvas === null) {
      localStorage.setItem(`noise-draw-sketch-${id}`, JSON.stringify(dumps));
    }
  };

  sk.newPartDrawing = () => {
    if (givenCanvas !== null) {
      canvasNumber = sk.settings.items.length + 1;
      givenCanvas = null;
    }
    for (let i = 0; i < globleDrawArray.length; i += 1) {
      globleDrawArray[i].m = null;
    }
    drawCount += 1;
    const draw = new Draw(drawCount);
    draw.rec = true;
    console.log('ok');
    globleDrawArray.push(draw);
  };

  sk.draw = () => {
    sk.background(255 - sk.constrain((sk.mouseY - sk.pmouseY) * 3, 0, 200), 30 + Math.abs(sk.mouseY - sk.pmouseY) * 3);
    amplitude = 0.01;
    sk.ellipse(sk.mouseX, sk.mouseY, 5, 5);
    sk.push();
    sk.textSize(18);
    sk.textAlign(sk.CENTER);
    sk.text(canvasNumber, 0.5 * sk.width, 0.9 * sk.height);
    sk.pop();
    if (state === 0 && givenCanvas == null) {
      sk.push();
      sk.noStroke();
      sk.fill(100, 0, 0, (Math.cos(sk.frameCount / 20) + 0.5) * 200 + 30 + sk.random(-20, 0));
      sk.textSize(35 + sk.random(-0.2, 0.2));
      sk.textAlign(sk.CENTER);
      sk.textFont('courrier');
      sk.text('double-click to draw/pause', 0.5 * sk.windowWidth + sk.map(sk.noise(xoff), 0, 1, -5, 10), sk.map(sk.noise(30 + xoff * 2), 0, 1, -10, 10) + 0.5 * sk.height);
      sk.pop();
    }
    tremolo.set({
      // roomSize: 0.5 + Math.abs((sk.mouseX - sk.width / 2) / sk.width),
      wet: 0.1,
    });
    pan.set({ pan: sk.mouseX / sk.width - 0.5 });
    filt.set({
      frequency: sk.map(Math.abs(sk.mouseX - sk.width / 2), 0, sk.width / 2, 50, 300),
    });
    osc.set({
      frequency:
      Math.abs(sk.mouseY - sk.pmouseY) * 15,
    });
    xoff += 0.01;
    sk.stroke(0);
    sk.fill(0, 50 + sk.constrain(sk.mouseX - sk.pmouseX, -20, 100) + amplitude * 100);
    if (state % 2 === 1) {
      globleDrawArray[No].rec = true;
    } else {
      globleDrawArray[No].rec = false;
    }
    for (let i = 0; i < globleDrawArray.length; i += 1) {
      if (globleDrawArray[i].rec) {
        No = i;
      }
      globleDrawArray[i].mouse(inB);
      globleDrawArray[i].display(xoff);
    }
  };

  sk.touchStarted = function () {
  };

  sk.touchEnded = function () {
    if (canvasNumber !== -100) {
      sk.addSnapshot(canvasNumber);
    }
  };
  sk.keyPressed = () => {
    const { keyCode } = sk;
    if (keyCode == 189 || keyCode == 187) {
      Scale(globleDrawArray, 188 - keyCode);
    // Scale(mm[drawsN],188-keyCode);
    }
    if (keyCode == 32) {
      const w = window.open('about:blank', 'image from canvas');
      w.document.write(`<img src='${canvas.toDataURL('image/png')}' alt='from canvas'/>`);

      saveCanvas(`draw_${canvasNumber}`, 'tif');
    }
    if (keyCode == 78) {
      sk.newPartDrawing();
    }
    if (keyCode >= 49 && keyCode < 54) {
      canvasNumber = -100;
      drawsN = keyCode - 49;
      globleDrawArray = [];
      for (let e = 0; e < mm[drawsN].length; e++) {
        const dra = new Draw(e, mm[drawsN][e]);
        globleDrawArray[e] = dra;
      }
    }
  };
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(50, 50, 200);
  };

  document.addEventListener('touchmove', (n) => {
    n.preventDefault();
  }, { passive: false });
  document.addEventListener('touchstart', Dclick, { passive: false });
  document.addEventListener('dblclick', () => {
    state = (state + 1) % 2;
  },
  { passive: false });
  let tapedTwice = false;
  function Dclick(event) {
    if (!tapedTwice) {
      tapedTwice = true;
      setTimeout(() => { tapedTwice = false; }, 300);
      return false;
    }
    event.preventDefault();
    // action on double tap goes below
    state = (state + 1) % 2;

    // document.getElementById("myDropdown").classList.toggle("show");
  }
}


function Scale(_array, _i) {
  for (let ii = 0; ii < _array.length; ii++) {
    if (_array[ii].mp) {
      for (let e = 0; e < _array[ii].mp.length; e++) {
        const smallbig = 1 + _i / 10;
        _array[ii].mp[e].x *= smallbig;
        _array[ii].mp[e].y *= smallbig;
      }
    } else {
      for (let e = 0; e < _array[ii].length; e++) {
        const smallbig = 1 + _i / 10;
        _array[ii][e].x *= smallbig;
        _array[ii][e].y *= smallbig;
      }
    }
  }
}

function resetAllSnapshots() {
  if (confirm('You are about to delete all your drawings')) {
    localStorage.clear();
    canvasNumber = 0;
  }
}

document.touchmove = function (n) {
  n.preventDefault();
};
