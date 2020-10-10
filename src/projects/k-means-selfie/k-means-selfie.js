import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';

export default function (sk) {
  const numberOfK = Math.floor(Math.random() * 20);
  let points = [];
  let kMoyen = [];
  const kPoints = [];
  const dis = [];
  const colors = [];
  let vScale = 3;
  let Video;
  let kScale = 60;
  sk.stop = () => {
    sk.noLoop();
    Video.stop();
    Video.disconnect();
    clearInterval(sk.interval);
    sk.remove();
    console.log('k means killed');
  };

  sk.settings = {
    max: {
      value: 230,
      type: 'range',
      max: 256,
      min: 0,
      step: 1,
    },
    min: {
      value: 90,
      type: 'range',
      max: 256,
      min: 0,
      step: 1,
    },
    actions: [{ name: 'saveCapture', icon: 'camera' }],
  };

  sk.saveCapture = () => {
    if (sk.pixelDensity() > 0.5) {
      sk.saveCanvas(document.querySelector('canvas'), `noise-draw${sk.sketchName}`, 'png');
    }
  };

  sk.setup = () => {
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    const shortSide = sk.height < sk.width ? sk.height : sk.width;
    vScale = shortSide / 100;
    kScale = shortSide / (200 / numberOfK) / vScale;
    Video = sk.createCapture();
    sk.frameRate(30);
    Video.size(sk.width / vScale, sk.height / vScale);
    Video.loop();
    sk.textSize(20);
    for (let i = 0; i < 10000; i += 1) {
      const dump = { x: sk.random(0.3 * sk.width, 0.7 * sk.width), y: sk.random(0.3 * sk.height, 0.7 * sk.height) };
      points.push(dump);
    }
    kMoyen = [...points].slice(0, numberOfK + 1);
    for (let i = 0; i < kMoyen.length + 1; i += 1) {
      kPoints[i] = [];
      colors[i] = [
        sk.random(100, 255),
        sk.random(50, 255),
        sk.random(100, 500),
        200,
      ];
    }
  };

  function aver(arr) {
    if (arr.length === 0) {
      return { x: 0, y: 0 };
    }
    const [xs, ys] = [
      [],
      [],
    ];
    arr.forEach((obj) => {
      xs.push(obj.x);
      ys.push(obj.y);
    });
    const x = xs.reduce((a, b) => a + b) / xs.length;
    const y = ys.reduce((a, b) => a + b) / ys.length;
    return { x, y };
  }
  sk.setInterval = setInterval(() => {
    if (Video) {
      Video.loadPixels();
    }
  }, 30);
  sk.draw = () => {
    points = [];
    sk.loadPixels();
    // const intP = Math.floor((sk.map(sk.mouseX, 0, sk.width, 0.1, 5) + 0.5) * sk.width > 512 ? 2 : 1);
    // intP = sk.settings.pixels.value;
    const intP = 1;
    for (let y = 0; y < Video.height; y += intP) {
      for (let x = 0; x < Video.width; x += intP) {
        const index = (Video.width - x + 1 + y * Video.width) * 4;
        const r = Video.pixels[index + 0];
        const g = Video.pixels[index + 1];
        const b = Video.pixels[index + 2];
        const bright = (r + g + b) / 3;
        const kovacClassification = (r > 95 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15 && r - Math.min([g, b] > 15));
        if (bright > sk.settings.min.value && bright < sk.settings.max.value && kovacClassification) {
          const ee = {
            x: x * vScale, y: y * vScale, r, g, b, bright,
          };
          points.push(ee);
        }
      }
    }
    kMoyen[numberOfK + 1] = { x: sk.mouseX, y: sk.mouseY };
    sk.background(0);
    sk.noStroke();
    sk.textAlign(sk.CENTER);
    sk.fill(255);
    for (let i = 0; i < points.length; i += 1) {
      for (let t = 0; t < kPoints.length; t += 1) {
        dis[t] = calDistance(points[i], kMoyen[t]);
      }
      const t = Math.min(...dis);
      const n = dis.indexOf(t);
      kPoints[n].push(points[i]);
    }
    for (let i = 0; i < kPoints.length; i += 1) {
      kMoyen[i] = aver(kPoints[i]);
    }
    for (let i = 0; i < kPoints.length; i += 1) {
      sk.fill(colors[i]);
      const scale = vScale;
      kPoints[i].forEach((a) => {
        const r = scale / 1.5;
        sk.ellipse(a.x, a.y, r);
      });
      if (i === kMoyen.length - 1)sk.fill(200, 0, 180, 200);
      sk.noStroke();
      sk.ellipse(
        kMoyen[i].x,
        kMoyen[i].y,
        (Math.sqrt(kPoints[i].length) / numberOfK) * kScale,
      );
    }
    for (let i = 0; i < kMoyen.length; i += 1) {
      kPoints[i] = [];
    }
  };
  sk.handleTouchEnd = () => {
    // starting points cases
    if (Math.random() > 0.5) {
      for (let i = 0; i < numberOfK + 1; i += 1) {
        kMoyen[i] = { x: sk.random(0, sk.width), y: sk.random(0, sk.height) };
      }
    } else {
      kMoyen = points.slice(0, numberOfK + 1);
    }
    // rest points for each center and set Color
    for (let i = 0; i < kMoyen.length; i += 1) {
      kPoints[i] = [];
      colors[i] = [sk.random(100, 500), sk.random(50, 255), sk.random(100, 555), 200];
      const t = sk.random(30, 255);
      if (Math.random() > 0.3) colors[i] = [t, t, t, 200];
    }
  };
  setListeners(sk);
}
