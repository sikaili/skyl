import Tone from 'tone';
import setListeners from '@/js/utlis/addEventListeners';
import setGestures from '@/js/utlis/addGestures';
import { Vertices } from 'matter-js';

let globleDrawArray = [];
let viewMode = false;
let xoff = 0;
let yoff = 0;


export default function (sk) {
  const tremolo = new Tone.JCReverb(0.3);
  tremolo.set({
    wet: 0.1,
  });
  const pan = new Tone.Panner();
  const filt = new Tone.Filter(50, 'bandpass');
  const osc = new Tone.OmniOscillator('C#4', 'pwm').chain(new Tone.Volume(-4), filt, pan, tremolo, Tone.Master);
  osc.start();
  let windowScale = 1;

  sk.stop = () => {
    sk.noLoop();
    osc.dispose();
    filt.dispose();
    pan.dispose();
    tremolo.dispose();
    Tone.context.suspend();
    sk.remove();
  };
  sk.dark = Math.random() > 0.3;
  sk.toggleBackground = () => {
    sk.dark = !sk.dark;
  };
  sk.drawing = {
    parts: globleDrawArray,
    canvasCenter: { x: 0, y: 0 },
    currentPartNo: 0,
    get background() { return sk.dark ? 0 : 255; },
    get stroke() { return sk.dark ? [255, 150] : 0; },
    get fill() { return sk.dark ? 180 : 0; },
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
        name: 'toggleBackground', icon: 'contrast',
      },
      // {
      //   name: 'scaleDrawing', icon: 'add-circle', value: [undefined, 1.1 * windowScale],
      // },
      // {
      //   name: 'scaleDrawing', icon: 'remove-circle', value: [undefined, 0.9 * windowScale],
      // },
      {
        name: 'addSnapshot', get icon() { return this.value[0] ? 'star-outline' : 'star'; }, get value() { return [!sk.settings.list.current.includes('#')]; },
      },
      {
        name: 'removeSnapshot', icon: 'trash',
      },
      {
        name: 'copyResult', icon: 'copy',
      },
    ],
  };


  function Part(receivedpositions = []) {
    this.positions = receivedpositions.map((point) => ({ x: +point.x, y: +point.y }));
    this.isRecording = true;
    this.center = { x: 0, y: 0 };
    this.centerSetted = false;
    this.givenCenter = null;
    this.addPoints = (x, y) => {
      const position = { x: x - (this.center.x || 0), y: y - (this.center.y || 0) };
      const shouldAdd = position !== this.positions[this.positions.length - 1] || this.positions.length === 0;
      if (shouldAdd && this.isRecording && !sk.isPaused) {
        this.positions.push(position);
      }
      if (sk.touches.length > 2 || (sk.keyIsPressed && sk.mouseIsPressed)) {
        this.positions.splice(this.positions.length - 1, 1);
        this.positions.splice(this.positions.length - 1, 1);
      }
    };
    this.centerPoints = (position) => {
      if (position) {
        this.givenCenter = position;
      } else if (!this.centerSetted) {
        this.center = Vertices.centre(this.positions);
        this.positions = this.positions.map((point) => ({ x: point.x - this.center.x, y: point.y - this.center.y }));
        this.centerSetted = true;
      }
    };

    this.display = (xoff, yoff) => {
      sk.push();
      const points = this.positions.length === 0 ? this.positions : this.positions;
      const center = this.givenCenter || this.center;
      sk.translate(center.x, center.y);
      // if (sk.isPaused) {
      //   const markerColor = this.isRecording ? [100, 0, 0, 100] : [100, 100, 100, 100, 255];
      //   sk.fill(markerColor);
      //   sk.ellipse(0, 0, 100);
      // }
      sk.beginShape();
      for (let ee = 0; ee < points.length; ee += 1) {
        // this.mouseI = sk.map(Math.abs(sk.mouseX - sk.width / 2), 0, sk.width / 2, 0.5, 1.5);
        this.offset = (sk.map(sk.noise(yoff * xoff, ee / 100 * xoff), 0, 1, -8, 8) + Math.sin(ee / 100 + sk.frameCount / 100) * 5 * Math.random()) * (sk.width > 468 ? 1 : 0.5);
        // this.offset = (sk.noise(yoff * xoff, sk.frameCount / 400) - 0.5) * 20;
        // sk.vertex(points[ee].x + this.offset * Math.sin(xoff), points[ee].y + this.offset * sk.noise(xoff) * sk.constrain((sk.mouseY - sk.pmouseY) / 2, 0.5, 800));
        sk.vertex(points[ee].x + this.offset, points[ee].y + this.offset * sk.noise(xoff) * sk.constrain((sk.mouseY - sk.pmouseY) / 2, 0.5, 800));
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
  sk.draw = () => {
    sk.background(sk.drawing.background - sk.constrain((sk.mouseY - sk.pmouseY) * 3, 0, 75), 60 + Math.abs(sk.mouseY - sk.pmouseY) * 3);
    sk.ellipse(sk.mouseX, sk.mouseY, 5, 5);
    sk.push();
    sk.textSize(18);
    sk.textAlign(sk.CENTER);
    sk.text(sk.settings.list.current, 0.5 * sk.width, 0.9 * sk.height);
    sk.pop();
    if (sk.isPaused && !viewMode) {
      sk.background(sk.drawing.background, 170);
      sk.push();
      sk.noStroke();
      sk.fill(150, 100, 100, (Math.cos(sk.frameCount / 20) + 0.5) * 100 + 150 + sk.random(-20, 0));
      sk.textSize(25 + sk.random(-0.2, 0.2));
      sk.textAlign(sk.CENTER);
      sk.textFont('courier');
      sk.text('press\nto\n draw/pause', 0.5 * sk.windowWidth + sk.map(sk.noise(xoff), 0, 1, -5, 10), sk.map(sk.noise(30 + xoff * 2), 0, 1, -10, 10) + 0.5 * sk.height);
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
    xoff += 0.02;
    yoff += 1 * sk.map(sk.mouseY, 0, sk.height, -0.1, 0.1);

    sk.strokeWeight(Math.random() * 2);
    sk.stroke(sk.drawing.stroke);
    sk.fill(sk.drawing.fill, 30 + sk.constrain(sk.mouseX - sk.pmouseX, -20, 100));
    // display parts
    globleDrawArray.forEach((part) => {
      if (part.isRecording && !viewMode) {
        part.addPoints(sk.mouseX, sk.mouseY);
      }
      part.display(xoff, yoff);
    });
  };

  sk.updateList = () => {
    sk.settings.list.items = Object.keys(localStorage).filter((name) => name.includes('noise-draw-')).map((name) => name.slice('noise-draw-'.length));
  };
  sk.copyResult = () => {
    const copyToClipBoard = (str) => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
    copyToClipBoard(localStorage.getItem(`noise-draw-${sk.settings.list.current}`));
    window.location.href = `mailto:noise-draw@sikai.li?subject=noise-draw-${sk.settings.list.current}-positions&body=${localStorage.getItem(`noise-draw-${sk.settings.list.current}`)}`;
  };
  sk.removeSnapshot = () => {
    const name = sk.settings.list.current;
    if (confirm(`You are about to delete :${name}`)) {
      localStorage.removeItem(`noise-draw-${name}`);
      sk.newCanvas();
    }
    sk.updateList();
  };
  sk.getSnapshot = (sketchName) => {
    globleDrawArray = [];
    viewMode = true;
    const canvas = JSON.parse(localStorage.getItem(`noise-draw-${sketchName}`));
    if (canvas) {
      sk.settings.list.current = sketchName;
      sk.settings.list.current = sk.settings.list.current;
      for (let e = 0; e < canvas.length; e += 1) {
        globleDrawArray[e] = new Part(canvas[e]);
      }
    }
    sk.updateList();
    sk.fitDrawingToWindow();
    sk.fitDrawingToWindow();
    sk.fitDrawingToWindow(undefined, true);
  };
  sk.addSnapshot = (select) => {
    const dumps = [];
    for (let mm = 0; mm < globleDrawArray.length; mm += 1) {
      const dump = globleDrawArray[mm].positions.map((element) => ({ x: +element.x, y: +element.y }));
      dumps.push(dump);
    }
    if (globleDrawArray[0].positions.length > 300 && !viewMode) {
      localStorage.setItem(`noise-draw-${sk.settings.list.current}`, JSON.stringify(dumps));
    }
    // hash unhash
    if (typeof select === 'boolean') {
      localStorage.removeItem(`noise-draw-${sk.settings.list.current}`);
      if (select) {
        sk.settings.list.current = `#${sk.settings.list.current}`;
      } else {
        sk.settings.list.current = sk.settings.list.current.split('').filter((a) => a !== '#').join('');
      }
      localStorage.setItem(`noise-draw-${sk.settings.list.current}`, JSON.stringify(dumps));
    }
    sk.updateList();
  };

  sk.newCanvas = () => {
    sk.updateList();
    sk.settings.list.current = `${sk.settings.list.items.length }-${ Math.random().toFixed(1)}`;
    viewMode = false;
    sk.currentPartNo = 0;
    globleDrawArray = [];
    globleDrawArray[0] = new Part();
    sk.isPaused = true;
  };
  sk.newPartDrawing = () => {
    if (viewMode) {
      sk.settings.list.current += Math.random().toFixed();
      viewMode = false;
    }
    for (let i = 0; i < globleDrawArray.length; i += 1) {
      globleDrawArray[i].receivedpositions = [];
      globleDrawArray[i].isRecording = false;
    }
    globleDrawArray.push(new Part());
    sk.drawing.currentPartNo = globleDrawArray.length - 1;
  };
  sk.fitDrawingToWindow = (parts = globleDrawArray, center = false) => {
    const allPoints = [];
    parts.forEach((part) => {
      const partPoints = part.positions ? part.positions : part;
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
      sk.scaleDrawing(undefined, windowScale * scale);
    }
  };
  sk.moveDrawing = (parts = globleDrawArray, x = 0, y = 0) => {
    parts.forEach((part) => {
      part.positions.forEach((point) => {
        point.x += x;
        point.y += y;
      });
    });
  };
  sk.scaleDrawing = (parts = globleDrawArray, scale, center = { x: 0, y: 0 }) => {
    scale /= windowScale;
    parts.forEach((part) => {
      const relativePositions = part.positions.map((position) => ({ x: position.x - center.x, y: position.y - center.y }));
      relativePositions.forEach((point) => {
        point.x *= scale;
        point.y *= scale;
      });
      part.positions = relativePositions.map((position) => ({ x: position.x + center.x, y: position.y + center.y }));
    });
    windowScale = scale;
  };

  sk.handleTouchStart = () => {
  };
  sk.handleTouchMove = () => {
    if (!sk.startPosition) {
      sk.startPosition = { x: sk.pmouseX, y: sk.pmouseY };
    }
    if (sk.isPaused) {
      const x = sk.mouseX - sk.startPosition.x;
      const y = sk.mouseY - sk.startPosition.y;
      if (Math.abs(x) + Math.abs(y) < 70) {
        sk.moveDrawing(undefined, x, y);
      }
      sk.startPosition.y = sk.mouseY;
      sk.startPosition.x = sk.mouseX;
    }
  };
  sk.handleTouchEnd = () => {
    sk.addSnapshot();
  };
  sk.keyPressed = () => {
    const { keyCode } = sk;
    switch (keyCode) {
      case 32:
        sk.saveCapture();
        break;
      case 187:
      case 189:
        sk.scaleDrawing(globleDrawArray, windowScale * (1 + (188 - keyCode) / 10));
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
  };
  sk.saveCapture = () => {
    if (sk.pixelDensity() > 0.5) {
      sk.saveCanvas(document.querySelector('canvas'), `noise-draw${sk.sketchName}`, 'png');
    }
  };
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(50, 50, 200);
  };
  sk.handleRotate = () => {
  };
  sk.handlePinch = (event) => {
    if (sk.isPaused) {
      const { scale } = event;
      const centerX = Math.min(...sk.touches.map((touch) => touch.x));
      const centerY = Math.max(...sk.touches.map((touch) => touch.y));
      sk.scaleDrawing(undefined, (scale - windowScale) / 25 + windowScale, { x: centerX, y: centerY });
    }
  };
  sk.handlePress = () => {
    sk.isPaused = !sk.isPaused;
  };

  setListeners(sk, Tone);
  setGestures(sk);
}


function resetAllSnapshots() {
  if (confirm('You are about to delete all your drawings')) {
    localStorage.clear();
    sk.settings.list.current = 0;
  }
}
