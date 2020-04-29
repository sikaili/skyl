import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';

export default (instance) => {
  const sk = instance;
  sk.settings = {
    dA: {
      value: 1,
      default: 1,
      type: 'range',
      max: 3,
      min: 0.2,
      step: 0.1,
    },
    dB: {
      value: 0.5,
      default: 0.5,
      type: 'range',
      max: 3,
      min: 0.2,
      step: 0.1,
    },
    feed: {
      value: 0.0545,
      default: 0.0545,
      type: 'range',
      max: 0.15,
      min: 0.01,
      step: 0.001,
      noRandom: true,
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
      value: 1,
      default: 1,
      type: 'range',
      max: 2,
      min: 0.2,
      step: 0.1,
    },
    threshold: {
      value: 0.1,
      default: 0.1,
      type: 'range',
      max: 1,
      min: 0.0,
      step: 0.1,
    },
    point: Math.random() > 0.5 && sk.windowWidth < 768,
    actions: [{ name: 'saveCapture', icon: 'camera' }, { name: 'randomParams', icon: 'shuffle' }, { name: 'resetDefaultSettings', icon: 'refresh' }],
  };
  let grid;
  let next;
  const dA = () => +sk.settings.dA.value;
  const dB = () => +sk.settings.dB.value;
  const feed = () => +sk.settings.feed.value;
  const k = () => +sk.settings.k.value;
  const t = () => +sk.settings.t.value;
  const threshold = () => +sk.settings.threshold.value;
  // const interval = Math.floor(Math.random() * 3 + 2) * (sk.width > 512 ? 2 : 1);
  const interval = 8;


  sk.stop = () => {
    clearInterval(sk.interval);
    sk.noLoop();
    sk.remove();
  };
  sk.randomParams = () => {
    const keys = Object.keys(sk.settings).filter((key) => sk.settings[key].type === 'range');
    keys.forEach((name) => {
      if (!sk.settings[name].noRandom) {
        sk.settings[name].value = sk.random(sk.settings[name].min, sk.settings[name].max).toFixed(2);
      }
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
  sk.saveCapture = () => {
    sk.pixelDensity(sk.windowWidth < 512 ? 5 : 12);
    setTimeout(() => {
      sk.saveCanvas(document.querySelector('canvas'), `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
      if (sk.width > 512) {
        sk.settings.point = true;
        sk.redraw();
        sk.saveCanvas(document.querySelector('canvas'), `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
        sk.settings.point = false;
      }
      sk.pixelDensity(1);
    }, 100);
  };
  const initAB = (img) => {
    const height = Math.floor(sk.height / interval);
    const width = Math.floor(sk.width / interval);
    let brightness = 1;
    if (img) {
      img.loadPixels();
      // console.log(img.pixels);
    }
    for (let x = 0; x < width; x += 1) {
      if (!sk.gridIsSet) {
        grid[x] = [];
        next[x] = [];
      }
      for (let y = 0; y < height; y += 1) {
        if (img) {
          const n = (y * width + x) * 4;
          brightness = img.pixels.slice(n, n + 3).reduce((a, b) => a + b) / 3 / 255;
        }
        if (sk.gridIsSet && Math.abs(brightness - next[x][y].a) > 0.2) {
          grid[x][y] = {
            a: brightness,
            b: 1 - brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
          };
        }
        if (!sk.gridIsSet) {
          grid[x][y] = {
            a: brightness,
            b: 1 - brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
          };
          next[x][y] = {
            a: brightness,
            b: 1 - brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
          };
        }
      }
    }
    sk.gridIsSet = true;
  };
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.pixelDensity(1);
    grid = [];
    next = [];
    sk.strokeCap(sk.SQUARE);
    sk.video = sk.createCapture();
    sk.frameRate(30);
    sk.video.size(Math.floor(sk.width / interval), Math.floor(sk.height / interval));
    sk.video.loop();
    setInterval(() => {
      initAB(sk.video);
    }, 300);
    // const loadImage = new Promise((res) => {
    //   sk.loadImage('/img/reaction.png', (img) => {
    //     img.width = Math.floor(sk.width / interval);
    //     img.height = Math.floor(sk.height / interval);
    //     res(img);
    //   });
    // });

    // loadImage.then((res) => {
    //   console.log(res);
    //   initAB(res);
    // });
  };


  // make two laplace function, much better setInterval performance
  const laplaceA = (x, y) => {
    let sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    return sumA;
  };
  const laplaceB = (x, y) => {
    let sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    return sumB;
  };
  const swap = () => {
    const temp = grid;
    grid = next;
    next = temp;
  };
  sk.interval = setInterval(() => {
    if (grid) {
      for (let x = 0; x < grid.length; x += 1) {
        for (let y = 0; y < grid[1].length; y += 1) {
          const { a, b, isBorder } = grid[x][y];
          if (isBorder) return;
          const laplaceAValue = laplaceA(x, y);
          const laplaceBValue = laplaceB(x, y);
          const noise = sk.noise(x / 100, y / 100);
          if (noise > threshold()) {
            next[x][y].a = a + (dA() * laplaceAValue - a * b * b + feed() * (1 - a)) * t();
            next[x][y].b = b + (dB() * laplaceBValue + a * b * b - (k() + feed()) * b) * t();
            next[x][y].a = sk.constrain(next[x][y].a, 0, 1);
            next[x][y].b = sk.constrain(next[x][y].b, 0, 1);
          }
        }
      }
      swap();
    }
  }, 5);

  sk.draw = () => {
    sk.background(255);
    for (let x = 0; x < grid.length; x += 1) {
      for (let y = 0; y < grid[0].length; y += 1) {
        const { a } = grid[x][y];
        const { b } = grid[x][y];
        let diffrence = Math.floor((a - b) * 255);
        if (diffrence < 230) {
          if (sk.settings.point) {
            sk.stroke(diffrence);
            sk.strokeWeight(interval);
            sk.point(x * interval, y * interval);
          } else {
            if (diffrence > 127) {
              diffrence = 127 + (diffrence - 127) * 3;
            }
            sk.push();
            sk.stroke(diffrence, 200);
            sk.strokeWeight(sk.map(diffrence, 0, 230, sk.width > 512 ? 4 : 2, -1));
            sk.translate(x * interval - interval, y * interval - interval);
            sk.rotate(sk.noise(x / 50, y / 30) * 2 * 3.14);
            sk.line(0, 0, 0, interval + sk.noise(x / 100, y / 100) * 3);
            sk.pop();
          }
        }
      }
    }
  };

  sk.handleTouchEnd = () => {
    sk.staticBodyVertex = undefined;
  };
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        if (calDistance(lastPoint, { x: sk.mouseX, y: sk.mouseY }) > 0) {
          sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
          const gridPoint = { x: Math.floor(sk.mouseX / interval), y: Math.floor(sk.mouseY / interval) };
          for (let i = gridPoint.x - 4; i < gridPoint.x + 4; i += 1) {
            grid[i][gridPoint.y].b = 1;
          }
        }
      } else {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      }
    }
  };
  sk.handleTouchStart = (ev) => {
    ev.preventDefault();
    sk.staticBodyVertex = [];
    sk.trigger = true;
    setTimeout(() => {
      sk.trigger = false;
    }, 150);
  };
  setListeners(sk);
};
