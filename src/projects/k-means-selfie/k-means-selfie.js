import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';

export default function (sk) {
  let points = [];
  const k = 50;
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
    sk.remove();
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
    pixels: {
      value: 5,
      type: 'range',
      max: 10,
      min: 1,
      step: 1,
    },
    actions: [{ name: 'saveCaputure', icon: 'camera' }],
  };

  sk.saveCapture = () => {
    if (sk.pixelDensity() > 0.5) {
      sk.saveCanvas(document.querySelector('canvas'), `noise-draw${sk.sketchName}`, 'png');
    }
  };

  sk.setup = () => {
    sk.pixelDensity(1);
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    if (sk.height > sk.width) {
      vScale = 5;
      kScale = 150;
    }
    Video = sk.createCapture(Video);
    console.log(Video);
    Video.loop();
    Video.size(sk.width / vScale, sk.height / vScale);
    sk.textSize(20);
    for (let i = 0; i < 10000; i += 1) {
      const dump = sk.createVector(sk.random(0.3 * sk.width, 0.7 * sk.width), sk.random(0.3 * sk.height, 0.7 * sk.height));
      points.push(dump);
    }
    kMoyen = [...points].slice(0, k + 1);
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
      return sk.createVector(0, 0);
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
    return sk.createVector(x, y);
  }
  sk.draw = () => {
    points = [];
    Video.loadPixels();
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
        const ee = sk.createVector(x * vScale, y * vScale);
        ee.r = r;
        ee.g = g;
        ee.b = b;
        if (bright > sk.settings.min.value && bright < sk.settings.max.value) points.push(ee);
      }
    }
    kMoyen[k + 1] = sk.createVector(sk.mouseX, sk.mouseY);
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
      sk.stroke(colors[i]);
      kPoints[i].forEach((a) => {
        sk.ellipse(
          a.x + Math.random(),
          a.y - Math.random(),
          2,
          2 + Math.random(),
        );
      });
      sk.fill(colors[i][0], colors[i][1], colors[i][2], 100);
      if (i === kMoyen.length - 1)sk.fill(200, 0, 180, 200);
      sk.noStroke();
      sk.ellipse(
        kMoyen[i].x,
        kMoyen[i].y,
        (Math.sqrt(kPoints[i].length) / k) * kScale,
      );
    }
    for (let i = 0; i < kMoyen.length; i += 1) {
      kPoints[i] = [];
    }
  };
  sk.handleTouchEnd = () => {
    // starting points cases
    if (Math.random() > 0.5) {
      for (let i = 0; i < k + 1; i += 1) {
        kMoyen[i] = sk.createVector(sk.random(0, sk.width), sk.random(0, sk.height));
      }
    } else {
      kMoyen = points.slice(0, k + 1);
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
