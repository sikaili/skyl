import * as Tone from 'tone';
import PeakDetect from '@/js/utlis/PeakDetect';
import setListeners from '@/js/utlis/addEventListeners';
import { Vertices } from 'matter-js';
import drawings from '../noise-draw/drawings.json';

// const AudioContext = window.AudioContext // Default
//               || window.webkitAudioContext; // Safari and old versions of Chrome
// if (!window.audioCtx) {
//   window.audioCtx = new AudioContext({ sampleRate: 44100 });
//   Tone.setContext(window.audioCtx);
// }

export default (instance) => {
  const sk = instance;
  sk.stop = () => {
    sk.stopped = true;
    sk.noLoop();
    sk.player.disconnect();
    sk.player.dispose();
    fft.dispose();
    // Tone.context.close();
    sk.remove();
    Object.entries((prop) => delete sk[prop]);
    console.log('cave is killed');
  };

  sk.settings = {
    list: {
      current: '',
      // items: ['Cripple', 'Amarrage', 'Rotation', 'La Danse'],
    },
    freq1: {
      value: 650,
      // type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    freq2: {
      value: 250,
      // type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    randomShape: {
      value: 0.3,
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
    isDark: true,
    actions: [
      {
        name: 'toggleColor',
        icon: 'contrast',
      },
    ],
  };

  sk.toggleColor = () => {
    sk.settings.isDark = !sk.settings.isDark;
  };

  sk.settings.list.current = 'Amarrage';

  if (vm.$route.query.id && typeof vm.$route.query.id === 'string') {
    sk.settings.list.current = vm.$route.query.id;
  } else {
    const id = sk.settings.list.current;
    if (vm.$route.query.id !== id) {
      vm.$router.push({ query: { id } });
    }
  }
  const fft = new Tone.FFT();
  const peakDetect = new PeakDetect(40, 20000, 0.2);
  let sum;
  let sum1;

  sk.setSong = (songId, notInit = true) => {
    if (sk.settings.list.current === songId && notInit) {
      return;
    }
    sk.settings.list.current = songId;
    sk.isPlayed = false;
    sk.soundIsLoading = true;
    const sound = () => import('@/projects/player/sound/' + songId.toLowerCase().replace(' ', '-') + '.m4a'); //eslint-disable-line
    sound().then((module) => {
      const soundFile = module.default;
      if (sk.player) {
        sk.player.disconnect(fft);
        sk.player.disconnect();
        sk.player.dispose();
      }
      sk.player = new Tone.Player(soundFile, () => {
        sk.redraw();
        sk.loop();
        sk.soundIsLoading = false;
        if (notInit) {
          sk.player.start();
          sk.isPlayed = true;
        }
      }).toMaster();
      sk.player.connect(fft);
    });
  };
  sk.setSong(sk.settings.list.current, false);

  class Point {
    constructor(i, scale = 2, options, x, y) {
      if (!options) {
        options = {
          toInner: -0.1,
          speedScale: 0.04,
        };
      }
      this.x = x || (sk.noise(i / 100, Math.sin(sk.frameCount / 200) * sum) - 0.5) * (sk.width + sk.height) / scale;
      this.y = y || (sk.noise(i / 100, sk.frameCount / 200 * sum1) - 0.5) * (sk.width + sk.height) / scale;
      this.direction = 1;
      this.toInner = options.toInner;
      this.speedScale = options.speedScale;
    }

    get speed() {
      return (sk.noise(this.x / 100, this.y / 100) + this.toInner) * this.speedScale;
    }

    update(x = 0, y = 0) {
      this.x += (this.speed * 60 * this.x - x) * this.speed * this.direction * (sk.windowWidth > 640 ? 1 : 0.75);
      this.y += (this.speed * 60 * this.y - y) * this.speed * this.direction * (sk.windowWidth > 640 ? 1 : 0.75);
    }
  }

  const generatePoints = (number, givenPoints = [], big = null) => {
    if (sk.keepPoints) {
      return sk.points;
    }
    const scale = (Math.random() > 0.3 && !big) ? 2 : 1;
    const points = [];
    if (Math.random() > 0.8) number *= 5;

    if (Math.random() > sk.settings.randomShape.value && givenPoints.length === 0) {
      let arr = [];
      if (!Object.keys(localStorage).includes('drawingImported')) {
        Object.keys(drawings).forEach((name) => {
          localStorage.setItem(name, JSON.stringify(drawings[name]));
        });
        console.log('drawingImported', 'true');
        localStorage.setItem('drawingImported', 'true');
      }
      // export json of all # drawings
      // const obj = {};
      // names.forEach((name) => {
      //   let canvas = JSON.parse(localStorage.getItem(name));
      //   canvas = canvas[0].filter((point, index) => index % (Math.floor(canvas[0].length / 1000)) === 0);
      //   canvas = canvas.map((point) => ({ x: point.x.toFixed(2), y: point.y.toFixed(2) }));
      //   console.log(canvas.length);
      //   obj[name] = [canvas];
      // });
      // console.log(JSON.stringify(obj));
      const names = Object.keys(localStorage).filter((name) => (name.includes('noise-draw-#')));
      const name = names[sk.count || Math.floor(Math.random() * names.length)];
      const canvas = JSON.parse(localStorage.getItem(name));
      if (names.length > 3 && canvas && canvas[0] && canvas[0].length > 0 && canvas.length < 4) {
        canvas.forEach((part) => {
          part.filter((point, index) => index % (Math.floor(part.length / 1000)) === 0)
            .forEach((point) => {
              arr.push({ x: +point.x, y: +point.y });
            });
        });
        // arr = canvas[0].filter((point, index) => index % (Math.floor(canvas[0].length / 1000)) === 0);
        const center = Vertices.centre(arr);
        arr = arr.map((point) => ({ x: point.x - center.x, y: point.y - center.y }));
        const maxX = Math.max(...arr.map((point) => Math.abs(point.x)));
        const maxY = Math.max(...arr.map((point) => Math.abs(point.y)));
        const scaleX = (sk.width / 2 - 30) / maxX;
        const scaleY = (sk.height / 2 - 30) / maxY;
        const scale = scaleX > scaleY ? scaleY : scaleX;
        arr = arr.map((point) => ({ x: point.x * scale, y: point.y * scale }));
        number = arr.length + 300;
      }
      if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
          number = 100 + Math.random() * 400;
          arr = [];
        }
        if (Math.random() > 0.5) {
        // circle
          for (let i = 0; i < 2 * 3.14; i += 0.1) {
            const r = 150;
            const x = r * Math.sin(i) + sk.noise(i / 100) * 10;
            const y = r * Math.cos(i) + sk.noise(i / 100) * 10;
            arr.push({ x, y });
          }
        } else {
        // rect
          for (let x = -150; x <= 150; x += 10) {
            arr.push({ x, y: 150 });
          }
          for (let y = 150; y >= -150; y -= 10) {
            arr.push({ x: 150, y });
          }
          for (let x = 150; x >= -150; x -= 10) {
            arr.push({ x, y: -150 });
          }
          for (let y = -150; y <= 150; y += 10) {
            arr.push({ x: -150, y });
          }
        }
      }
      givenPoints = arr;
    }
    for (let i = 0; i < number; i += 1) {
      if (givenPoints.length > 0) {
        const x = givenPoints[i % givenPoints.length].x + sk.noise(i / 30, sk.frameCount / 300) * 25;
        const y = givenPoints[i % givenPoints.length].y + sk.noise(i / 30, sk.frameCount / 300) * 25;
        points[i] = new Point(i, scale, { toInner: -0.3, speedScale: 0.035 }, x, y);
      } else {
        points[i] = new Point(i, scale);
      }
    }
    return points;
  };

  sk.setup = () => {
    // sk.noCursor();
    sk.points = generatePoints(5, [{ x: -50, y: 50 }, { x: 50, y: 50 }, { x: 50, y: -50 }, { x: -50, y: -50 }]);
    sk.randomSeed(2200);
    sk.rectMode(sk.CENTER);
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.peakDetect = new PeakDetect();
    sk.stroke(255, 255, 255);
    sk.textFont('Helvetica');
    sk.textAlign(sk.CENTER);
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height / 2;
  };
  let xoff = 0;
  sk.count = undefined;
  sk.keyPressed = () => {
    const { keyCode } = sk;
    switch (keyCode) {
      case 32:
        sk.count += 1;
        break;
      default:
        break;
    }
  };
  sk.draw = () => {
    const spectrum = fft.getValue().map((value) => Math.abs((value + 100) * 2.55));
    peakDetect.update(spectrum);
    const selectedFreq = spectrum.filter((freq, i) => (i > sk.settings.freq1.value) && (i < sk.settings.freq1.value + 200));
    sum = 255 - selectedFreq.reduce((a, b) => a + b) / 200;
    const selectedFreq1 = spectrum.filter((freq, i) => (i > sk.settings.freq2.value) && (i < sk.settings.freq2.value + 200));
    sum1 = 300 - selectedFreq1.reduce((a, b) => a + b) / 100;
    sum = sk.constrain(sum, 1, 500);
    sum1 = sk.constrain(sum1, 1, 500);

    const colors = {
      get background() {
        if (sk.settings.isDark) {
          return [0, (sk.noise((sum + sum1) / 600, xoff / 600) + 0.3) * 150];
        }
        return [0, sum1 / 6 + sum / 4 + 30];
      },
      get fill() {
        if (sk.settings.isDark) {
          return [50 + sum1 / 2.5 + sk.noise((sum + sum1) / 300, xoff / 200) * 255, 100 + sk.noise(sum / 300, xoff / 400) * 200];
        }
        return [328 - sum1, (sk.noise(sum1 / 300 + xoff) - 0.33) * 255];
      },
      get stroke() {
        if (sk.settings.isDark) {
          return [0, (1 - sk.noise((sum + sum1) / 600 + 100, xoff / 600) + 0.4) * 500];
        }
        return [sum1 * 2, 125 + sum1 / 1.5];
      },
    };
    if (sum < 170) {
      sum /= 5;
    }
    if (sum1 < 170) {
      sum1 /= 5;
    }
    xoff += 0.05 * (sum1 / 255);
    sk.background(...colors.background);

    // peak detection
    if (peakDetect.isDetected) {
      if (sk.points && (Math.random > 0.5 || (sum < 210 && sum1 < 210))) {
        clearInterval(sk.interval);
        sk.interval = null;
        return;
      }
      if (sk.points[0].direction === 1 && Math.random() > 0.7) {
        // console.log('detect');
        sk.points.forEach((point) => { point.direction = -2; });
        setTimeout(() => {
          sk.points.forEach((point) => { point.direction = 0.3; });
        }, 500);
      } else if (Math.random() > 0.5) {
        // console.log('detect =>');
        sk.points = generatePoints(sum * 6);
      }
      if (Math.random() > 0.5 && sk.interval) {
        clearInterval(sk.interval);
        sk.interval = null;
      }
      // glitching interval
      if (Math.random() > 0.8 && sum > 200 && sum1 > 230 && !sk.interval) {
        sk.interval = setInterval(() => {
          if (sk.points[0].direction === 1) {
            sk.points.forEach((point) => { point.direction = -10; });
          } else {
            sk.points = generatePoints(sum1 * 5, 1);
          }
        }, 60);
        setTimeout(() => {
          clearInterval(sk.interval);
          sk.interval = null;
        }, 400);
      }
      sk.push();
      sk.background([255, 255, 255, 255]);
      sk.stroke(0);
      sk.fill(0);
      sk.translate(sk.width / 2, sk.height / 2);
      if (Math.random() > 0.5) {
        sk.ellipse(0, 0, 300);
      } else {
        sk.rect(0, 0, 300);
      }
      sk.pop();
    }
    sk.push();
    sk.translate(sk.width / 2, sk.height / 2);
    // default view
    sk.fill(...colors.fill);
    sk.stroke(...colors.stroke);
    sk.strokeWeight(Math.random() * 2);
    // high gain view
    if (sum1 > 280 && Math.random() > 0.7) {
      const brightness = (Math.random() - 0.3) * 510;
      sk.background(brightness);
      sk.stroke(255 - brightness);
      sk.fill(brightness, 255);
      if (sk.points[0].direction === 1 && Math.random() > 0.5) {
        // console.log('here');
        sk.points.forEach((point) => { point.direction = -5; });
        sk.timeOut = setTimeout(() => {
          sk.points = generatePoints(sum * 6);
        }, 600);
      } else {
        clearTimeout(sk.timeOut);
        sk.points = generatePoints(sum * 6, [], 1);
      }
    }
    // display points
    sk.beginShape();
    sk.points.forEach((point, index) => {
      const theta = index / 400;
      point.update(sk.mouseX - sk.width / 2, sk.mouseY - sk.height / 2);
      const offsetAmplitude = sk.width > 640 ? 20 : 10;
      const offsetA = (sk.noise(theta * xoff * sum1 / 200, theta * sum / 100 * point.speed) - 0.5) * offsetAmplitude;
      const offsetB = (sk.noise(theta * xoff * sum / 200, theta * sum1 / 100 + xoff) - 0.5) * offsetAmplitude;
      sk.vertex(point.x + offsetA, point.y + offsetB);
      // to mouse center line
      if (index % 150 === 0 && (sk.touched || point.direction < 0)) {
        sk.stroke((Math.random() - 0.5) * 600);
        sk.line(sk.mouseX - sk.width / 2, sk.mouseY - sk.height / 2, point.x + offsetA, point.y + offsetB);
      }
    });
    sk.endShape();
    sk.beginShape();
    if (sk.mousePoints) {
      sk.mousePoints.forEach((point, index) => {
        const theta = index / 400;
        point.update(sk.mouseX - sk.width / 2, sk.mouseY - sk.height / 2);
        const offsetAmplitude = sk.width > 640 ? 20 : 10;
        const offsetA = (sk.noise(theta * xoff * sum1 / 200, theta * sum / 100 * point.speed) - 0.5) * offsetAmplitude;
        const offsetB = (sk.noise(theta * xoff * sum / 200, theta * sum1 / 100 + xoff) - 0.5) * offsetAmplitude;
        sk.vertex(point.x + offsetA, point.y + offsetB);
      });
    }
    sk.endShape();
    sk.pop();
    // sk.text(`${sum}\n${sum1}`, 0.5 * sk.width, 0.8 * sk.height);
    // showing mouse path
    if (sk.staticBodyVertex) {
      sk.strokeWeight(1);
      sk.stroke(Math.random() * 255, 255);
      sk.fill(0, 100);
      sk.beginShape();
      sk.staticBodyVertex.forEach((point, index) => {
        const offset = (sk.noise(index / 200 + xoff * sum1 / 200, sum / 100) - 0.5) * 20;
        sk.vertex(point.x + offset, point.y + offset);
      });
      sk.endShape();
    }
    // welcome screen
    if (sk.soundIsLoading || !sk.isPlayed) {
      sk.background(0, 180);
      sk.noStroke(0);
      sk.fill(200, 100, 100, (Math.sin((sk.frameCount / 50) * sk.PI) + 1) * 180);
      sk.textSize(sk.width > 768 ? 36 : 24);
      if (!sk.soundIsLoading) {
        sk.text('Touch to Play', 0.5 * sk.width, sk.windowHeight * 0.6);
        sk.fill(180, (Math.sin((sk.frameCount / 50) * sk.PI) + 1) * 180);
        sk.textSize(sk.width > 768 ? 24 : 18);
        sk.text('(sound on)', 0.5 * sk.width, sk.windowHeight * 0.6 + 48);
      } else {
        sk.text('Loading...', 0.5 * sk.windowWidth, sk.windowHeight * 0.6);
      }
      sk.textSize(18);
      sk.fill(150);
      sk.text(sk.settings.list.current, 0.5 * sk.windowWidth, 0.3 * sk.windowHeight + 130);
    }
  };

  sk.handleTouchEnd = () => {
    sk.touched = false;
    const center = { x: sk.width / 2, y: sk.height / 2 };
    if (sk.staticBodyVertex) {
      const arr = sk.staticBodyVertex.map((point) => ({ x: point.x - center.x, y: point.y - center.y }));
      if (arr.length > 10) {
        sk.mousePoints = generatePoints(127, arr);
        setTimeout(() => {
          sk.mousePoints = null;
        }, 1000);
      }
      sk.staticBodyVertex = null;
    }
    if (!sk.soundIsLoading) {
      if (sk.player.state === 'stopped') {
        sk.player.start();
        sk.isPlayed = true;
        sk.mouseX = 0.5 * sk.width;
        sk.mouseY = 0.4 * sk.height;
      }
    }
  };
  sk.handleTouchStart = () => {
    sk.touched = true;
    if (Math.random() > 0.7) {
      sk.points.forEach((point) => {
        point.direction = -1;
      });
    } else {
      sk.staticBodyVertex = [];
    }
  };
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      } else {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      }
    }
  };
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(0);
  };
  setListeners(sk, Tone);
};
