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
    console.log('vis is killed');
  };

  sk.settings = {
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
      value: 500,
      type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    freq2: {
      value: 200,
      type: 'range',
      max: 950,
      min: 50,
      step: 50,
    },
    sum: {
      value: 200,
      type: 'range',
      max: 500,
      min: 0,
      step: 1,
    },
    sum1: {
      value: 200,
      type: 'range',
      max: 500,
      min: 0,
      step: 1,
    },
    get getColor() { return [this.red.value, this.green.value, this.blue.value] || [255, 50, 50]; },
  };

  sk.songId = 'rotation';
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
      case 'amarrage':
        sk.settings.grey = true;
        sk.settings.freq1.vale = 300;
        sk.settings.freq2.vale = 650;
        break;
      default:
        sk.settings.grey = false;
        break;
    }
  };
  sk.setSong(sk.songId);

  sk.setup = () => {
    sk.points = generatePoints(4, [{ x: -50, y: 50 }, { x: 50, y: 50 }, { x: 50, y: -50 }, { x: -50, y: -50 }]);
    sk.randomSeed(2200);
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.peakDetect = new PeakDetect();
    sk.stroke(255, 255, 255);
    sk.strokeWeight(10);
    sk.textFont('Helvetica');
    sk.textAlign(sk.CENTER);
  };
  const generatePoints = (number, givenPoints) => {
    if (Math.random() > 0.8) number *= 5;
    const scale = (Math.random() > 0.3) ? 2 : 1;
    const points = [];
    if (givenPoints) {
      return givenPoints.map((point) => ({
        ...point,
        direction: 1,
        get speed() { return Math.random() > 0 ? (sk.noise(this.x / 100, this.y / 100) - 0.1) / 25 : Math.random() / 15; },
        update() {
          this.x += (this.speed * 60 * this.x) * this.speed;
          this.y += (this.speed * 60 * this.y) * this.speed;
        },
      }));
    }
    for (let i = 0; i < number; i += 1) {
      points[i] = {
        get speed() { return Math.random() > 0 ? (sk.noise(this.x / 100, this.y / 100) - 0.1) / 25 : Math.random() / 15; },
        direction: 1,
        x: (sk.noise(i / 100, sum) - 0.5) * (sk.width + sk.height) / scale,
        y: (sk.noise(i / 100, sk.frameCount / 200 + sum1) - 0.5) * (sk.width + sk.height) / scale,
        update() {
          this.x += (this.speed * 60 * this.x) * this.speed * this.direction;
          this.y += (this.speed * 60 * this.y) * this.speed * this.direction;
        },
      };
    }
    return points;
  };
  let xoff = 0;
  sk.draw = () => {
    xoff += 0.03;
    const spectrum = fft.getValue().map((value) => Math.abs((value + 100) * 2.55));
    peakDetect.update(spectrum);
    const selectedFreq = spectrum.filter((freq, i) => (i > sk.settings.freq1.value) && (i < sk.settings.freq1.value + 200));
    sum = 400 - selectedFreq.reduce((a, b) => a + b) / 200;
    const selectedFreq1 = spectrum.filter((freq, i) => (i > sk.settings.freq2.value) && (i < sk.settings.freq2.value + 200));
    sum1 = 500 - selectedFreq1.reduce((a, b) => a + b) / 200;
    sum = sk.constrain(sum, 0, 500);
    sum1 = sk.constrain(sum1, 0, 500);
    sk.background([0, 0, 0, sum1]);
    // peak detection
    if (peakDetect.isDetected && !sk.staticBodyVertex) {
      if (sk.points && (Math.random > 0.4 || (sum < 180 && sum1 < 150))) {
        clearInterval(sk.interval);
        return;
      }
      sk.background([255, 255, 255, 255]);
      if (sk.points[0].direction === 1 && Math.random() > 0.5) {
        sk.points.map((point) => { point.direction = -3; });
        setTimeout(() => {
          sk.points = generatePoints(sum1 * 6);
        }, 600);
      } else {
        sk.points = generatePoints(sum1 * 5);
      }
      if (Math.random() > 0.5) {
        clearInterval(sk.interval);
      }
      if (Math.random() > 0.8 && sum > 250 && sum1 > 200) {
        sk.interval = setInterval(() => {
          sk.background(255);
          sk.points = generatePoints((500 - sum1) * 5);
        }, 20);
        setTimeout(() => {
          clearInterval(sk.interval);
        }, 600);
      }
      sk.stroke(255);
      sk.push();
      sk.translate(sk.width / 2, sk.height / 2);
      sk.beginShape();
      sk.points.forEach((point, index) => {
        const theta = index / 100;
        sk.vertex(-point.x + sk.noise(theta) * 5, -point.y + sk.noise(theta) * 5);
      });
      sk.endShape(sk.CLOSE);
      sk.pop();
    }
    sk.push();
    sk.strokeWeight(1);
    sk.translate(sk.width / 2, sk.height / 2);
    sk.fill(sum1 / 2, 400 - sum);
    sk.stroke(255, sum1 / 2 + 125);
    if (sum1 > 395) {
      const brightness = (Math.random() - 0.5) * 400;
      sk.background(brightness);
      sk.stroke(255 - brightness);
      sk.fill(brightness, 255);
    }
    sk.beginShape();
    sk.points.forEach((point, index) => {
      const theta = index / 200;
      point.update();
      sk.vertex(point.x + (sk.noise(theta * xoff * sum1 / 200) - 0.5) * 20, point.y + (sk.noise(theta + xoff * sum / 200) - 0.5) * 20);
    });
    sk.endShape(sk.CLOSE);
    sk.pop();
    sk.fill(0);
    // sk.text(`${sum}\n${sum1}`, 0.5 * sk.width, 0.8 * sk.height);
    // showing mouse path
    if (sk.staticBodyVertex) {
      sk.strokeWeight(10);
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
    console.log(arr);
    if (arr.length > 10) {
      sk.points = generatePoints(300, arr);
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
        // const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        // if (calDistance(lastPoint.x, lastPoint.y, sk.mouseX, sk.mouseY) > 2) {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
        // }
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
