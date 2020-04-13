import Tone from 'tone';
import PeakDetect from '@/js/utlis/PeakDetect';

export default (instance) => {
  const sk = instance;
  const divNode = document.querySelector('#canvasContainer');

  sk.stop = () => {
    sk.stopped = true;
    sk.noLoop();
    sk.player.disconnect();
    sk.player.dispose();
    fft.dispose();
    Tone.context.suspend();
    sk.remove();
    Object.entries((prop) => delete sk[prop]);
    console.log('cave is killed');
  };

  sk.settings = {
    player: true,
    red: {
      value: 255,
      type: 'range',
      max: 255,
      min: 0,
      step: 1,
    },
    green: {
      value: 50,
      type: 'range',
      max: 155,
      min: 0,
      step: 1,
    },
    blue: {
      value: 50,
      type: 'range',
      max: 255,
      min: 0,
      step: 1,
    },
    freq1: {
      value: 700,
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
    get getColor() { return [this.red.value, this.green.value, this.blue.value] || [255, 50, 50]; },
  };

  sk.songId = 'amarrage';

  if (vm.$route.query.id && typeof vm.$route.query.id === 'string') {
    sk.songId = vm.$route.query.id;
  } else {
    vm.$router.push({ query: { id: sk.songId } });
  }
  const fft = new Tone.FFT();
  const peakDetect = new PeakDetect(40, 20000, 0.2);
  let sum;
  let sum1;

  sk.setSong = (songId) => {
    sk.songId = songId;
    songId = songId.toLowerCase();
    const sound = () => import('../player/sound/' + songId + '.m4a'); //eslint-disable-line
    sound().then((module) => {
      const soundFile = module.default;
      sk.soundIsLoading = true;
      sk.isPlayed = false;
      if (sk.player) {
        sk.player.disconnect(fft);
        sk.player.disconnect();
        sk.player.dispose();
      }
      sk.player = new Tone.Player(soundFile, () => { sk.soundIsLoading = false; }).toMaster();
      sk.player.connect(fft);
    });
    switch (songId) {
      case 'rotation':
      default:
        sk.settings.grey = false;
        break;
    }
  };
  sk.setSong(sk.songId);

  const generatePoints = (number, givenPoints, big = null) => {
    if (sk.keepPoints) {
      return sk.points;
    }
    if (Math.random() > 0.8) number *= 5;
    // number = number > 1000 ? 1000 : number;
    const scale = (Math.random() > 0.3 && !big) ? 2 : 1;
    const points = [];
    if (!givenPoints) {
      givenPoints = [];
    }
    if (Math.random() > 0.79 && givenPoints.length === 0) {
      number = Math.random() * 500 + 300;
      const arr = [];
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
      givenPoints = arr;
    }
    // given points
    if (givenPoints.length > 0) {
      for (let i = 0; i < number; i += 1) {
        points[i] = {
          get speed() { return (sk.noise(this.x / 100 + i / 100, this.y / 100 + i / 100) - 0.4) / 25; },
          direction: 1,
          x: givenPoints[i % givenPoints.length].x,
          y: givenPoints[i % givenPoints.length].y,
          update() {
            this.x += (this.speed * 60 * this.x) * this.speed * this.direction;
            this.y += (this.speed * 60 * this.y) * this.speed * this.direction;
          },
        };
      }
      return points;
    }
    // normal
    for (let i = 0; i < number; i += 1) {
      points[i] = {
        get speed() { return (sk.noise(this.x / 100, this.y / 100) - 0.1) / 25; },
        direction: 1,
        x: (sk.noise(i / 100, Math.sin(sk.frameCount / 200) * sum) - 0.5) * (sk.width + sk.height) / scale,
        y: (sk.noise(i / 100, sk.frameCount / 200 * sum1) - 0.5) * (sk.width + sk.height) / scale,
        update() {
          this.x += (this.speed * 60 * this.x) * this.speed * this.direction * (sk.windowWidth > 640 ? 1 : 0.75);
          this.y += (this.speed * 60 * this.y) * this.speed * this.direction * (sk.windowWidth > 640 ? 1 : 0.75);
        },
      };
    }
    return points;
  };

  sk.setup = () => {
    sk.points = generatePoints(5, [{ x: -50, y: 50 }, { x: 50, y: 50 }, { x: 50, y: -50 }, { x: -50, y: -50 }]);
    sk.randomSeed(2200);
    sk.rectMode(sk.CENTER);
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.peakDetect = new PeakDetect();
    sk.stroke(255, 255, 255);
    sk.textFont('Helvetica');
    sk.textAlign(sk.CENTER);
  };
  let xoff = 0;
  sk.draw = () => {
    xoff += 0.05;
    // const spectrum = fft.getValue().map((value) => { if (value) console.log(value); });
    const spectrum = fft.getValue().map((value) => Math.abs((value + 100) * 2.55));

    peakDetect.update(spectrum);
    const selectedFreq = spectrum.filter((freq, i) => (i > sk.settings.freq1.value) && (i < sk.settings.freq1.value + 200));
    sum = 255 - selectedFreq.reduce((a, b) => a + b) / 200;
    const selectedFreq1 = spectrum.filter((freq, i) => (i > sk.settings.freq2.value) && (i < sk.settings.freq2.value + 200));
    sum1 = 300 - selectedFreq1.reduce((a, b) => a + b) / 200 * 2;
    sum = sk.constrain(sum, 0, 500);
    sum1 = sk.constrain(sum1, 0, 500);
    sk.background([0, 0, 0, sum / 2]);
    // peak detection
    if (peakDetect.isDetected && !sk.staticBodyVertex) {
      if (sk.points && (Math.random > 0.5 || (sum < 210 && sum1 < 210))) {
        clearInterval(sk.interval);
        sk.interval = null;
        return;
      }
      if (sk.points[0].direction === 1 && Math.random() > 0.7) {
        // console.log('detect');
        sk.points.forEach((point) => { point.direction = -3; });
        setTimeout(() => {
          sk.points.forEach((point) => { point.direction = 0.3; });
        }, 600);
      } else if (Math.random() > 0.5) {
        // console.log('detect =>');
        sk.points = generatePoints(sum * 6, 1);
      }
      if (Math.random() > 0.5 && sk.interval) {
        clearInterval(sk.interval);
        sk.interval = null;
      }
      // glitching interval
      if (Math.random() > 0.8 && sum > 200 && sum1 > 230 && !sk.interval) {
        sk.interval = setInterval(() => {
          if (sk.points[0].direction === 1) {
            sk.points.forEach((point) => { point.direction = -20; });
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
    sk.strokeWeight(1);
    sk.translate(sk.width / 2, sk.height / 2);
    // default view
    sk.fill(328 - sum1, (sk.noise(sum1 / 300 + xoff) - 0.33) * 255);
    sk.stroke(sum1 * 2, 125 + sum1 / 1.5);
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
    sk.beginShape();
    sk.points.forEach((point, index) => {
      const theta = index / 400;
      point.update();
      const offsetAmplitude = sk.width > 640 ? 20 : 10;
      const offset = (sk.noise(theta * xoff * sum1 / 200, theta * sum / 100 * point.speed) - 0.5) * offsetAmplitude;
      const offsetB = (sk.noise(theta + xoff * sum1 / 200) - 0.5) * offsetAmplitude;
      sk.vertex(point.x + offset, point.y + offset);
    });
    sk.endShape();
    sk.pop();
    sk.fill(0);
    // sk.text(`${sum}\n${sum1}`, 0.5 * sk.width, 0.8 * sk.height);
    // showing mouse path
    if (sk.staticBodyVertex) {
      sk.strokeWeight(3);
      sk.stroke(255, 150);
      sk.beginShape();
      sk.staticBodyVertex.forEach((point) => {
        sk.vertex(point.x + Math.random() * 3, point.y);
      });
      sk.endShape();
    }
    // welcome screen
    if (sk.soundIsLoading || !sk.isPlayed) {
      sk.background(0, 180);
      sk.noStroke(0);
      sk.fill(200, 100, 100, (Math.sin((sk.frameCount / 50) * sk.PI) + 1) * 180);
      sk.textSize(sk.width > 768 ? 36 : 24);
      if (sk.soundIsLoading === false) {
        sk.text('Touch to Play', 0.5 * sk.width, sk.windowHeight * 0.6);
      } else {
        sk.text('Loading...', 0.5 * sk.windowWidth, sk.windowHeight * 0.6);
      }
      sk.textSize(18);
      sk.fill(150);
      sk.text(sk.songId, 0.5 * sk.windowWidth, 0.3 * sk.windowHeight + 130);
    }
  };

  sk.handleTouchEnd = () => {
    const center = { x: sk.width / 2, y: sk.height / 2 };
    const arr = sk.staticBodyVertex.map((point) => ({ x: point.x - center.x, y: point.y - center.y }));
    if (arr.length > 10) {
      sk.points = generatePoints(400, arr);
      sk.keepPoints = true;
      setTimeout(() => {
        sk.keepPoints = false;
      }, 1000);
    }
    sk.staticBodyVertex = null;

    sk.background(0);
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
    sk.staticBodyVertex = [];
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

  divNode.addEventListener(
    'click',
    async () => {
      await Tone.start();
      sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    async () => {
      await Tone.start();
      sk.soundIsReady = true;
    },
    { once: true, passive: false },
  );
  divNode.addEventListener(
    'touchstart',
    () => {
      sk.handleTouchStart();
    },
    {
      passive: false,
    },
  );

  divNode.addEventListener(
    'mousedown',
    () => {
      sk.handleTouchStart();
    },
    {
      passive: false,
    },
  );

  divNode.addEventListener('touchend', sk.handleTouchEnd, {
    passive: false,
  });

  divNode.addEventListener('mouseup', sk.handleTouchEnd, {
    passive: false,
  });
  divNode.addEventListener(
    'touchmove',
    sk.handleTouchMove,
    { passive: false },
  );
  divNode.addEventListener(
    'mousemove',
    sk.handleTouchMove,
    { passive: false },
  );
};
