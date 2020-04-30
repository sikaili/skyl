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
    interval: {
      value: 8,
      type: 'range',
      max: 9,
      min: 2,
      step: 1,
      callback: { name: 'changeInterval', get value() { return sk.settings.interval.value; } },
    },
    point: Math.random() > 0.5,
    actions: [
      { name: 'saveCapture', icon: 'camera' },
      { name: 'randomParams', icon: 'shuffle' },
      { name: 'resetDefaultSettings', icon: 'refresh' },
    ],
  };
  let grid;
  let next;
  const dA = () => +sk.settings.dA.value;
  const dB = () => +sk.settings.dB.value;
  const feed = () => +sk.settings.feed.value;
  const k = () => +sk.settings.k.value;
  const t = () => +sk.settings.t.value;
  const threshold = () => +sk.settings.threshold.value;
  let interval = sk.settings.interval.value;

  sk.changeInterval = (val) => {
    sk.noLoop();
    clearInterval(sk.interval);
    grid = [];
    next = [];
    sk.gridIsSet = false;
    interval = parseInt(val, 10);
    sk.video.noLoop();
    sk.video.size(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    initAB();
    sk.beginInterval();
    sk.loop();
  };
  sk.randomParams = () => {
    const keys = Object.keys(sk.settings).filter((key) => sk.settings[key].type === 'range');
    keys.forEach((name) => {
      if (!sk.settings[name].noRandom) {
        sk.settings[name].value = sk.random(sk.settings[name].min, sk.settings[name].max).toFixed(2);
      }
    });
  };
  sk.stop = () => {
    clearInterval(sk.interval);
    sk.video.stop();
    sk.vidoe.disconnect();
    sk.noLoop();
    sk.remove();
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
        sk.settings.point = !sk.settings.point;
        sk.redraw();
        sk.saveCanvas(document.querySelector('canvas'), `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
        sk.settings.point = !sk.settings.point;
      }
      sk.pixelDensity(1);
    }, 100);
  };
  const initAB = (img) => {
    const height = Math.ceil(sk.height / interval);
    const width = Math.ceil(sk.width / interval);
    let brightness = 1;
    if (img) {
      img.loadPixels();
    }
    for (let x = 0; x < width; x += 1) {
      if (!sk.gridIsSet) {
        grid[x] = [];
        next[x] = [];
      }
      for (let y = 0; y < height; y += 1) {
        if (img && img.pixels && !grid[x][y].isBorder) {
          const n = (y * width + x) * 4;
          const r = img.pixels[n];
          const g = img.pixels[n + 1];
          const b = img.pixels[n + 2];

          // if (brightness > sk.settings.min.value / 255 && brightness < sk.settings.max.value / 255) {
          // if (r > 95 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
          // const kovacClassification = (r > 95 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15 && r - Math.min([g, b] > 15));
          // const ratioModelClassification = ((r - g) / (r + g) >= 0) && ((r - g) / (r + g) <= 0.5) && (b / (r + g) <= 0.5);
          brightness = img.pixels.slice(n, n + 3).reduce((a, b) => a + b) / 3 / 255;
          if (brightness < 0.2) {
            // grid[x][y].color = img.pixels.slice(n, n + 3);
            // next[x][y].color = img.pixels.slice(n, n + 3);
            grid[x][y].b = 1;
            // grid[x][y].scale = brightness + 0.5;
            // next[x][y].scale = brightness + 0.5;
          }
        }
        if (!sk.gridIsSet) {
          brightness = 1;
          grid[x][y] = {
            a: brightness,
            b: 1 - brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
          };
          next[x][y] = {
            a: 1 - brightness,
            b: brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
          };
        }
      }
    }
    sk.gridIsSet = true;
  };
  const sendText = (canvas = sk.textContent, text = 'hi') => {
    canvas.background(255);
    canvas.push();
    canvas.fill(0);
    canvas.textSize(canvas.width * 0.5);
    canvas.textAlign(sk.CENTER, sk.CENTER);
    canvas.translate(canvas.width / 2, canvas.height / 2);
    canvas.text(text, 0, 0);
    canvas.pop();
    initAB(canvas);
  };
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.pixelDensity(1);
    grid = [];
    next = [];
    sk.strokeCap(sk.SQUARE);
    const constraints = { video: { frameRate: { ideal: 10, max: 30 } } };
    sk.settings.point = true;
    sk.video = sk.createCapture(constraints);
    sk.video.size(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));

    initAB();

    sk.beginInterval();
    // const loadImage = new Promise((res) => {
    //   sk.loadImage('/img/reaction1.png', (img) => {
    //     img.width = Math.ceil(sk.width / interval);
    //     img.height = Math.ceil(sk.height / interval);
    //     res(img);
    //   });
    // });
    sk.textContent = sk.createGraphics(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    sendText();
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
  sk.beginInterval = () => {
    sk.interval = setInterval(() => {
      if (grid && grid.length > 0) {
        for (let x = 0; x < grid.length; x += 1) {
          for (let y = 0; y < grid[0].length; y += 1) {
            const {
              a, b, isBorder, scale,
            } = grid[x][y];
            if (isBorder) {
              next[x][y] = grid[x][y];
            } else {
              const noise = sk.noise(x / 100, y / 100);
              if (noise > threshold()) {
                next[x][y].a = a + (dA() * laplaceA(x, y) - a * b * b + feed() * (1 - a)) * t() * (scale || 1);
                next[x][y].b = b + (dB() * laplaceB(x, y) + a * b * b - (k() + feed()) * b) * t() * (scale || 1);
                next[x][y].a = sk.constrain(next[x][y].a, 0, 1);
                next[x][y].b = sk.constrain(next[x][y].b, 0, 1);
              }
            }
          }
        }
        swap();
      }
    }, 5);
  };

  sk.draw = () => {
    sk.background(255);
    for (let x = 0; x < grid.length; x += 1) {
      for (let y = 0; y < grid[0].length; y += 1) {
        if (!grid[x][y].isBorder) {
          const {
            a, b, color,
          } = grid[x][y];

          let diffrence = Math.floor((a - b) * 255);
          if (diffrence < 200) {
            if (sk.settings.point) {
              sk.stroke(diffrence);
              if (color) {
                sk.stroke([...color, 255]);
              }
              sk.strokeWeight(interval);
              sk.point(x * interval, y * interval);
            } else {
              if (diffrence > 127) {
                diffrence = 127 + (diffrence - 127) * 3;
              }
              sk.push();
              sk.stroke(diffrence, 255 - diffrence);
              sk.strokeWeight(sk.map(diffrence, 0, 230, sk.width > 512 ? 4 : 2, -1));
              sk.translate(x * interval, y * interval);
              sk.rotate(sk.noise(x / 50, y / 30) * 2 * 3.14);
              sk.line(0, 0, 0, interval + sk.noise(x / 100, y / 100) * 3);
              sk.pop();
            }
          }
        }
      }
    }
  };
  // sk.handleTouchEnd = () => {
  //   if (!sk.staticBodyVertex || sk.staticBodyVertex.length < 3) {
  //     grid.map((arrX, x) => {
  //       arrX.map((arrY, y) => {
  //         grid[x][y].a = 1;
  //         grid[x][y].b = 0;
  //       });
  //     });
  //     sk.video.loop();
  //     initAB(sk.video);
  //   }
  //   sk.staticBodyVertex = undefined;
  // };
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        if (calDistance(lastPoint, { x: sk.mouseX, y: sk.mouseY }) > 0) {
          sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
          const gridPoint = { x: Math.floor(sk.mouseX / interval), y: Math.floor(sk.mouseY / interval) };
          for (let i = gridPoint.x - 4; i < gridPoint.x + 4; i += 1) {
            try {
              grid[i][gridPoint.y].b = 1;
            } catch (e) {
              //
            }
          }
        }
      } else {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      }
    }
  };
  sk.keyPressed = () => {
    sk.background(255);
    const { keyCode } = sk;
    sendText(undefined, String.fromCharCode(keyCode));
    clearTimeout(sk.inputTimeout);
    if (!sk.tapping) {
      sk.tapping = [];
    }
    sk.inputTimeout = setTimeout(() => {
      console.log(sk.tapping);
      sendText(undefined, String.fromCharCode(...sk.tapping));
      sk.tapping = undefined;
    }, 200);
    sk.tapping.push(keyCode);
    if (!sk.staticBodyVertex || sk.staticBodyVertex.length < 3) {
      grid.map((arrX, x) => {
        arrX.map((arrY, y) => {
          grid[x][y].a = 1;
          grid[x][y].b = 0;
        });
      });
    }
    // switch (keyCode) {
    //   case 32:
    //     sk.isPaused = !sk.isPaused;
    //     break;
    //   default:
    //     break;
    // }
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
