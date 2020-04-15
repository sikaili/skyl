import Tone from 'tone';
import setListeners from '@/js/utlis/addEventListeners';


const inB = false;
let globleDrawArray = [];
let givenCanvas = null;
let xoff = 0;
const yoff = 0;
let canvasNumber;
const amplitude = 0.01;
let drawCount = 0;
let No = 0;


export default function (sk) {
  const tremolo = new Tone.JCReverb(0.3);
  tremolo.set({
    wet: 0.1,
  });
  const pan = new Tone.Panner();
  const filt = new Tone.Filter(50, 'bandpass');
  const osc = new Tone.OmniOscillator('C#4', 'pwm').chain(new Tone.Volume(-4), filt, pan, tremolo, Tone.Master);
  osc.start();


  sk.stop = () => {
    sk.noLoop();
    osc.dispose();
    filt.dispose();
    pan.dispose();
    tremolo.dispose();
    Tone.context.suspend();
    sk.remove();
  };


  sk.settings = {
    name: 'noise-draw',
    list: {
      current: 'OK',
      items: [],
      action: 'getSnapshot',
    },
    speed: {
      value: 100,
      // type: 'range',
      max: 1000,
      min: 1,
      step: 10,
    },
    actions: [
      {
        name: 'newCanvas',
        icon: 'refresh',
      },
      {
        name: 'newPartDrawing',
        icon: 'add',
      },
      {
        name: 'fitDrawingToWindow', icon: 'qr-scanner',
      },
      {
        name: 'fitDrawingToWindow', icon: 'contract', value: [undefined, true],
      },
      {
        name: 'scaleDrawing', icon: 'add-circle', value: [undefined, 1.1],
      },
      {
        name: 'scaleDrawing', icon: 'remove-circle', value: [undefined, 0.9],
      },
      {
        name: 'removeSnapshot', icon: 'trash',
      },
    ],
  };


  function Draw(d, _m) {
    this.d = d;
    this.mp = [];
    this.rec = false;
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
    this.display = (xoff, yoff) => {
      sk.push();
      sk.fill(0, 50 + sk.constrain(sk.mouseX - sk.pmouseX, -20, 100));
      sk.beginShape();
      for (let ee = 0; ee < this.mp.length; ee += 1) {
        this.mouseI = sk.map(Math.abs(sk.mouseX - sk.width / 2), 0, sk.width / 2 - 200, 1, 2);
        this.offset = sk.map(sk.noise(yoff * xoff, ee / 100), 0, 1, -20 * this.mouseI, 20 * this.mouseI) / 3 / 2000 * (sk.width + sk.height);
        // this.offset = (sk.noise(yoff * xoff, sk.frameCount / 400) - 0.5) * 20;
        sk.vertex(this.mp[ee].x + this.offset * Math.sin(xoff), this.mp[ee].y + this.offset * sk.noise(xoff) * sk.constrain((sk.mouseY - sk.pmouseY) / 2, 0.5, 800));
        yoff += 0.5 * sk.map(sk.mouseY, 0, sk.height, -0.1, 0.1);
      }
      sk.endShape();
      sk.pop();
    };
  }

  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.strokeWeight(1);
    sk.newCanvas();
    sk.noCursor();
  };

  sk.updateList = () => {
    sk.settings.list.items = Object.keys(localStorage).filter((name) => name.includes('noise-draw-')).map((name) => name.slice('noise-draw-'.length));
  };

  sk.newCanvas = () => {
    sk.updateList();
    canvasNumber = sk.settings.list.items.length;
    sk.settings.list.current = `noise-draw-${ canvasNumber}`;
    givenCanvas = null;
    No = 0;
    globleDrawArray = null;
    globleDrawArray = [];
    globleDrawArray[0] = new Draw(0);
    sk.isPaused = true;
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
    sk.ellipse(sk.mouseX, sk.mouseY, 5, 5);
    sk.push();
    sk.textSize(18);
    sk.textAlign(sk.CENTER);
    sk.text(canvasNumber, 0.5 * sk.width, 0.9 * sk.height);
    sk.pop();
    if (sk.isPaused && givenCanvas == null) {
      sk.push();
      sk.noStroke();
      sk.fill(100, 0, 0, (Math.cos(sk.frameCount / 20) + 0.5) * 200 + 30 + sk.random(-20, 0));
      sk.textSize(35 + sk.random(-0.2, 0.2));
      sk.textAlign(sk.CENTER);
      sk.textFont('courrier');
      sk.text('double-click to draw/pause', 0.5 * sk.windowWidth + sk.map(sk.noise(xoff), 0, 1, -5, 10), sk.map(sk.noise(30 + xoff * 2), 0, 1, -10, 10) + 0.5 * sk.height);
      sk.pop();
    }
    pan.set({ pan: sk.mouseX / sk.width - 0.5 });
    filt.set({
      frequency: sk.map(Math.abs(sk.mouseX - sk.width / 2), 0, sk.width / 2, 50, 300),
    });
    osc.set({
      frequency:
      Math.abs(sk.mouseY - sk.pmouseY) * 15,
    });
    xoff += 0.01;
    sk.strokeWeight(Math.random() * 2);
    sk.stroke(0);
    sk.fill(0, 50 + sk.constrain(sk.mouseX - sk.pmouseX, -20, 100) + amplitude * 100);
    if (!sk.isPaused) {
      globleDrawArray[No].rec = true;
    } else {
      globleDrawArray[No].rec = false;
    }
    for (let i = 0; i < globleDrawArray.length; i += 1) {
      if (globleDrawArray[i].rec) {
        No = i;
      }
      globleDrawArray[i].mouse(inB);
      globleDrawArray[i].display(xoff, yoff);
    }
  };

  sk.fitDrawingToWindow = (parts = globleDrawArray, center = false) => {
    const allPoints = [];
    parts.forEach((part) => {
      const partPoints = part.mp ? part.mp : part;
      partPoints.forEach((point) => {
        allPoints.push(point);
      });
    });
    const xArray = allPoints.map((point) => point.x);
    const yArray = allPoints.map((point) => point.y);
    const minX = Math.min(...xArray);
    const maxX = Math.max(...xArray);
    const minY = Math.min(...yArray);
    const maxY = Math.max(...yArray);
    let moveX = 50 - minX;
    let moveY = 50 - minY;
    const scaleX = (sk.width - 50) / (maxX + moveX);
    const scaleY = (sk.height - 50) / (maxY + moveY);
    const scale = scaleY > scaleX ? scaleX : scaleY;
    if (center) {
      moveX = sk.width / 2 - (minX + maxX) / 2;
      moveY = sk.height / 2 - (minY + maxY) / 2;
      sk.moveDrawing(undefined, moveX, moveY);
    } else {
      sk.moveDrawing(undefined, moveX, moveY);
      sk.scaleDrawing(undefined, scale);
    }
  };

  sk.moveDrawing = (parts = globleDrawArray, x = 0, y = 0) => {
    parts.forEach((part) => {
      const partPoints = part.mp ? part.mp : part;
      partPoints.forEach((point) => {
        point.x += x;
        point.y += y;
      });
    });
  };

  sk.scaleDrawing = (parts = globleDrawArray, scale) => {
    parts.forEach((part) => {
      const partPoints = part.mp ? part.mp : part;
      partPoints.forEach((point) => {
        point.x *= scale;
        point.y *= scale;
      });
    });
  };

  sk.handleTouchStart = () => {
  };

  sk.handleTouchEnd = () => {
    if (canvasNumber !== -100) {
      sk.addSnapshot(canvasNumber);
    }
  };

  sk.keyPressed = () => {
    const { keyCode } = sk;
    switch (keyCode) {
      case 32:
        sk.saveCapture();
        break;
      case 187:
      case 189:
        sk.scaleDrawing(globleDrawArray, 1 + (188 - keyCode) / 10);
        break;
      case 78:
        sk.newPartDrawing();
        break;
      case 37:
      case 39:
        sk.moveDrawing(globleDrawArray, ((keyCode - 38) * 50));
        break;
      case 38:
      case 40:
        sk.moveDrawing(globleDrawArray, 0, ((keyCode - 39) * 50));
        break;
      default:
        break;
    }
    // if (keyCode >= 49 && keyCode < 54) {
    //   canvasNumber = -100;
    //   drawsN = keyCode - 49;
    //   globleDrawArray = [];
    //   for (let e = 0; e < mm[drawsN].length; e++) {
    //     const dra = new Draw(e, mm[drawsN][e]);
    //     globleDrawArray[e] = dra;
    //   }
    // }
  };

  sk.saveCapture = () => {
    if (sk.pixelDensity() > 0.5) {
      sk.saveCanvas(document.querySelector('canvas'), `ok${Date()}`, 'png');
    }
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(50, 50, 200);
  };
  setListeners(sk, Tone);

  document.addEventListener('touchmove', (n) => {
    n.preventDefault();
  }, { passive: false });
  document.addEventListener('touchstart', Dclick, { passive: false });
  document.addEventListener('dblclick', () => {
    sk.isPaused = !sk.isPaused;
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
    sk.isPaused = !sk.isPaused;
  }
}


function resetAllSnapshots() {
  if (confirm('You are about to delete all your drawings')) {
    localStorage.clear();
    canvasNumber = 0;
  }
}
