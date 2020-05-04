import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';

export default (instance) => {
  const sk = instance;
  sk.settings = {
    dA: {
      // value: 1,
      value: 1.23,
      default: 1.23,
      type: 'range',
      max: 3,
      min: 0.2,
      step: 0.01,
    },
    dB: {
      // value: 0.5,
      value: 1.3,
      default: 1.3,
      type: 'range',
      max: 3,
      min: 0.2,
      step: 0.01,
    },
    feed: {
      value: 0.0545,
      default: 0.0545,
      type: 'range',
      max: 0.15,
      min: 0.01,
      step: 0.001,
    },
    k: {
      value: 0.062,
      default: 0.062,
      type: 'range',
      max: 0.15,
      min: 0.01,
      step: 0.001,
      noRandom: true,
    },
    t: {
      // value: 1.0,
      value: 1.03,
      default: 1.03,
      type: 'range',
      max: 2,
      min: 0.2,
      step: 0.01,
    },
    threshold: {
      // value: 0.1,
      value: 0.45,
      default: 0.45,
      type: 'range',
      max: 1,
      min: 0.0,
      step: 0.01,
      noRandom: true,
    },
    interval: {
      value: sk.windowWidth > 512 ? 4 : 3,
      default: 4,
      type: 'range',
      max: 8,
      min: 2,
      step: 1,
      noRandom: true,
      callback: { name: 'changeInterval', get value() { return sk.settings.interval.value; } },
    },
    point: Math.random() > 0.5,
    actions: [
      { name: 'saveCapture', icon: 'camera' },
      { name: 'randomParams', icon: 'shuffle' },
      { name: 'resetDefaultSettings', icon: 'refresh' },
    ],
  };
  sk.randomParams = () => {
    const keys = Object.keys(sk.settings).filter((key) => sk.settings[key].type === 'range');
    keys.forEach((name) => {
      if (!sk.settings[name].noRandom) {
        sk.settings[name].value = sk.random(sk.settings[name].min, sk.settings[name].max).toFixed(2);
      }
    });

    new Array(Math.ceil(Math.random() * 3)).fill(null).map(() => {
      sk.keyCode = Math.floor(sk.random(50, 70));
      sk.keyPressed();
    });
  };
  sk.resetDefaultSettings = () => {
    const keys = Object.keys(sk.settings).filter((key) => sk.settings[key].type === 'range');
    keys.forEach((name) => {
      if (sk.settings[name].value && sk.settings[name].default) {
        sk.settings[name].value = sk.settings[name].default;
      }
    });
  };
  sk.stop = () => {
    sk.noLoop();
    sk.remove();
  };
  sk.saveCapture = () => {
    sk.pixelDensity(sk.windowWidth < 512 ? 5 : 12);
    sk.redraw();
    sk.saveCanvas(sk.canvas, `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
    if (sk.width > 512) {
      sk.settings.point = !sk.settings.point;
      sk.redraw();
      sk.saveCanvas(sk.canvas, `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
      sk.settings.point = !sk.settings.point;
    }
    sk.pixelDensity(1);
  };

  let featurePoints;
  const nth = 0;
  const interval = 10;
  const canvasX = () => Math.ceil(sk.width / interval);
  const canvasY = () => Math.ceil(sk.height / interval);
  let canvasPoints = [];
  const setPoints = () => {
    const points = [];
    for (let x = 0; x < canvasX(); x += 1) {
      for (let y = 0; y < canvasY(); y += 1) {
        const n = y * canvasX() + x;
        points[n] = { x, y };
      }
    }
    console.log(points);
    return points;
  };
  sk.setup = () => {
    sk.pixelDensity(1.0);
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.noStroke();
    featurePoints = Array(10).fill(null).map((a) => ({ x: Math.random() * canvasX(), y: Math.random() * canvasY() }));
    canvasPoints = setPoints();
    console.log(featurePoints);
  };
  sk.interval = setInterval(() => {
    featurePoints.forEach((point) => {
      point.x += (Math.random() - 0.5) * 5;
      point.y += (Math.random() - 0.5) * 5;
    });
    canvasPoints.forEach((point) => {
      const distances = featurePoints.map((pointA) => (calDistance(pointA, point)));
      distances.sort((a, b) => a - b);
      // console.log(distances.length);
      point.noise = distances[nth];
    });
  }, 30);


  sk.draw = () => {
    sk.background(255);
    canvasPoints.forEach((point) => {
      sk.fill(255 - point.noise * interval);
      sk.ellipse(point.x * interval, point.y * interval, interval);
    });
    // featurePoints.forEach((point) => {
    //   sk.fill(255, 0, 0);
    //   sk.ellipse(point.x * interval, point.y * interval, interval);
    // });
    // sk.noLoop();
  };
  sk.handleTouchEnd = () => {
  };
  sk.handleTouchMove = () => {
  };
  sk.keyPressed = () => {
    const { keyCode } = sk;
    switch (keyCode) {
      case 32:
        sk.saveCapture();
        break;
      default:
        break;
    }
  };
  sk.handleTouchStart = () => {
  };
  setListeners(sk);
};
