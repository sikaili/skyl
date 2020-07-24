import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';
import Tone from 'tone';
import texts from '../eyes/assets/hanzi.json';

window.Tone = window.Tone ? window.Tone : Tone;

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
      value: 0.3,
      default: 0.3,
      type: 'range',
      max: 1,
      min: 0.0,
      step: 0.01,
      noRandom: true,
    },
    interval: {
      value: sk.windowWidth > 512 ? 8 : 6,
      default: 6,
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

  const pans = Array(4).fill(new Tone.Panner());
  const oscs = Array(4).fill(null).map((a, n) => {
    const type = ['pulse', 'fmsine', 'amsine', 'fatsawtooth', 'square4', 'amsine', 'amsine'][Math.floor(Math.random() * 7)];
    return new Tone.OmniOscillator('C#4', type).chain(new Tone.Volume(-20), pans[n], Tone.Master);
  });

  let grid;
  let next;
  let interval = sk.settings.interval.value;
  const dA = () => +sk.settings.dA.value;
  const dB = () => +sk.settings.dB.value;
  const feed = () => +sk.settings.feed.value;
  const k = () => +sk.settings.k.value;
  const t = () => +sk.settings.t.value;
  const threshold = () => +sk.settings.threshold.value + sk.noise(sk.frameCount / 20) * (sk.noise(sk.frameCount / 5) - 0.5);

  sk.changeInterval = (val) => {
    sk.noLoop();
    clearInterval(sk.interval);
    grid = [];
    next = [];
    sk.gridIsSet = false;
    interval = parseInt(val, 10);
    sk.textContent.resizeCanvas(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    if (sk.video) {
      sk.video.noLoop();
      sk.video.size(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    }
    initGridAB();
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

    new Array(Math.ceil(Math.random() * 3)).fill(null).map(() => {
      sk.keyCode = Math.floor(sk.random(50, 70));
      sk.keyPressed();
    });
  };
  sk.stop = () => {
    clearInterval(sk.interval);
    sk.textContent.remove();
    if (sk.video) {
      sk.video.stop();
      sk.vidoe.disconnect();
    }
    sk.noLoop();
    oscs.map((osc) => osc.dispose());
    pans.map((pan) => pan.dispose());
    Tone.context.suspend();

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
    sk.redraw();
    sk.saveCanvas(sk.canvas, `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
    if (sk.width > 512 && null) {
      sk.settings.point = !sk.settings.point;
      sk.redraw();
      sk.saveCanvas(sk.canvas, `reaction_a${ dA() }b${dB() }f${feed() }k${k() }t${t()}`, 'png');
      sk.settings.point = !sk.settings.point;
    }
    sk.pixelDensity(1);
  };
  const initGridAB = (img) => {
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
          brightness = img.pixels.slice(n, n + 3).reduce((a, b) => a + b) / 3 / 255;
          if (!sk.video) {
            grid[x][y].b = 1 - brightness;
          } else {
            // if (brightness > sk.settings.min.value / 255 && brightness < sk.settings.max.value / 255) {
            // const ratioModelClassification = ((r - g) / (r + g) >= 0) && ((r - g) / (r + g) <= 0.5) && (b / (r + g) <= 0.5);
            const kovacClassification = (r > 95 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15 && r - Math.min([g, b] > 15));
            if (brightness < 1 && kovacClassification) {
              grid[x][y].color = img.pixels.slice(n, n + 3);
              next[x][y].color = img.pixels.slice(n, n + 3);
              grid[x][y].b = 1 - brightness;
              grid[x][y].a = brightness;
              grid[x][y].z = (1 - brightness) * -110;
              grid[x][y].scale = brightness + 0.5;
              next[x][y].scale = brightness + 0.5;
            } else {
              grid[x][y].color = null;
              next[x][y].color = null;
              grid[x][y].scale = 1;
              next[x][y].scale = 1;
            }
          }
        }
        if (!sk.gridIsSet) {
          brightness = 1;
          grid[x][y] = {
            a: brightness,
            b: 1 - brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
            noise: sk.noise(x / 20 / (7 / interval) + sk.frameCount, y / 20 / (7 / interval)),
            z: 0,
          };
          next[x][y] = {
            a: 1 - brightness,
            b: brightness,
            isBorder: x === 0 || y === 0 || x === width - 1 || y === height - 1,
            noise: sk.noise(x / 20 / (7 / interval) + sk.frameCount, y / 20 / (7 / interval)),
            z: 0,
          };
        }
      }
    }
    sk.gridIsSet = true;
  };
  const sendTextCanvas = (canvas = sk.textContent, text = 'home,I,had,a,lot.of,questions&and&no-answers.') => {
    // canvas.pixelDensity(1);
    canvas.background(255);
    canvas.push();
    canvas.fill(0);
    // add \n every 6 letters
    let textDump = text;
    for (let index = 1; index < text.length / 6; index += 1) {
      textDump = `${textDump.slice(0, index * 6 + (index - 1))}\n${textDump.slice(index * 6)}`;
    }
    text = textDump;
    canvas.textSize((canvas.width + canvas.height) / 4 / Math.sqrt(text.length / 2));
    canvas.textAlign(sk.CENTER, sk.CENTER);
    canvas.translate(canvas.width / 2, canvas.height / 2);
    canvas.text(text, 0, 0);
    canvas.pop();
    initGridAB(canvas);
  };
  sk.setup = () => {
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL);
    sk.pixelDensity(1);
    grid = [];
    next = [];
    sk.strokeCap(sk.SQUARE);
    const constraints = { video: { frameRate: { ideal: 10, max: 30 } } };
    if (false) {
      sk.video = sk.createCapture(constraints);
      sk.video.size(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    }
    sk.settings.point = true;
    initGridAB();
    // const loadImage = new Promise((res) => {
    //   sk.loadImage('/img/reaction1.png', (img) => {
    //     img.width = Math.ceil(sk.width / interval);
    //     img.height = Math.ceil(sk.height / interval);
    //     res(img);
    //   });
    // });
    // loadImage.then((res) => {
    //   console.log(res);
    //   initGridAB(res);
    // });
    sk.textContent = sk.createGraphics(Math.ceil(sk.width / interval), Math.ceil(sk.height / interval));
    sendTextCanvas();
    sk.beginInterval();
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
      if (sk.video) {
        initGridAB(sk.video);
      }
      if (grid && grid.length > 0) {
        for (let x = 0; x < grid.length; x += 1) {
          for (let y = 0; y < grid[0].length; y += 1) {
            const {
              a, b, isBorder, scale, noise,
            } = grid[x][y];
            if (noise > threshold() && !isBorder) {
              let aa = a + (dA() * laplaceA(x, y) - a * b * b + feed() * (1 - a)) * t() * (scale || 1);
              let bb = b + (dB() * laplaceB(x, y) + a * b * b - (k() + feed()) * b) * t() * (scale || 1);
              aa = aa > 1 ? 1 : aa;
              next[x][y].a = aa < 0 ? 0 : aa;
              bb = bb > 1 ? 1 : bb;
              next[x][y].b = bb < 0 ? 0 : bb;
            } else {
              next[x][y] = grid[x][y];
            }
          }
        }
        swap();
      }
    }, 30);
  };

  sk.draw = () => {
    let count = 0;

    // webgl
    sk.rotateY((sk.noise(sk.frameCount / 100) - 0.5) + (sk.y ? sk.y : 0));
    sk.rotateZ(sk.noise(sk.frameCount / 30) - 0.5 + (sk.z ? sk.z : 0));
    sk.rotateX(sk.noise(sk.frameCount / 50) / 2 + (sk.x ? sk.x : 0));
    sk.translate(-sk.width / 2, -sk.height / 2);

    sk.background(255);
    for (let x = 0; x < grid.length; x += 1) {
      for (let y = 0; y < grid[0].length; y += 1) {
        if (!grid[x][y].isBorder) {
          const {
            a, b, color, z,
          } = grid[x][y];

          let diffrence = Math.floor((a - b) * 255);
          if (diffrence < 50) {
            // point mode
            if (sk.settings.point) {
              sk.push();
              if (diffrence < 100) {
                sk.stroke(96 * (1 + sk.noise(x / 50 * diffrence, y / 50)), 200 - diffrence);
              } else {
                sk.noStroke();
              }
              sk.translate(x * interval, y * interval);
              const fill = 255 - (diffrence * diffrence) / 30;
              sk.fill(fill, -diffrence);
              if (z < 30 && color) {
                // const color1 = [...color].map((color) => (color + fill) / 2);
                // sk.fill([...color, 100]);
              }
              const height = diffrence * diffrence / 700 + 10 + z;
              let i = 0;
              if (height > 88 && height < 103) {
                count += 1;
                sk.normalMaterial();
                if (x / grid.length > 0.5) {
                  if (y / grid.length > 0.5) {
                    i = 0;
                  } else {
                    i = 1;
                  }
                } else if (y / grid.length > 0.5) {
                  i = 2;
                } else {
                  i = 3;
                }
                const pan = sk.constrain((x / grid.length - 0.5) + [0.75, 0.5, -0.5, -0.75][i], -1, 1);
                pans[i].set({ pan });
                oscs[i].set({
                  frequency:
                  sk.noise(x, y) * oscs[i].type && oscs[i].type.includes('sine') ? 440 : 880,
                });
              }
              sk.box(interval, interval, height);
              sk.pop();
            // stroke mode
            } else {
              if (diffrence > 127) {
                diffrence = 127 + (diffrence - 127) * 3;
              }
              sk.push();
              sk.stroke(diffrence, 127);
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

    Tone.Master.set({
      volume: sk.constrain(count === 0 ? -Infinity : -25 + Math.sqrt(count), -Infinity, -5),
    });
  };
  const resetGrid = () => {
    grid.map((arrX, x) => {
      arrX.map((arrY, y) => {
        grid[x][y].a = 1;
        grid[x][y].b = 0;
      });
    });
  };
  sk.handleTouchEnd = () => {
    if (!sk.soundIsOn) {
      Tone.start().then(() => {
        oscs.forEach((osc) => {
          if (osc.width) {
            osc.width.value = Math.random() * 4;
          }
          osc.count = Math.floor(Math.random() * 5);
          osc.spread = Math.floor(Math.random() * 5);
          osc.start();
          sk.soundIsOn = true;
        });
      });
    }
    if (!sk.staticBodyVertex || sk.staticBodyVertex.length < 3) {
      if (sk.video) {
        resetGrid();
        sk.video.loop();
        initGridAB(sk.video);
      }
    }
    sk.staticBodyVertex = undefined;
  };
  sk.skipCount = 0;
  sk.handleTouchMove = (ev) => {
    const sendTextDistanceThreshold = 40;
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        const distance = calDistance(lastPoint, { x: sk.mouseX, y: sk.mouseY });
        if (distance > 0 && distance < sendTextDistanceThreshold && sk.touches.length === 1) {
          sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
          const gridPoint = { x: Math.floor(sk.mouseX / interval), y: Math.floor(sk.mouseY / interval) };
          for (let i = gridPoint.x - 4; i < gridPoint.x + 4; i += 1) {
            try {
              grid[i][gridPoint.y].b = 1;
            } catch (e) {
              //
            }
          }
        } else if ((distance > sendTextDistanceThreshold && !sk.waiting) || sk.touches.length > 1) {
          sk.keyCode = Math.floor(sk.random(50, 100));
          sk.keyPressed();
          sk.skipCount += 1;
          if (sk.skipCount > 10) {
            clearTimeout(sk.debounce);
            sk.waiting = true;
            sk.debounce = setTimeout(() => {
              sk.waiting = false;
              sk.skipCount = 0;
            }, 700);
          }
        }
      } else {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      }
    }
  };
  sk.keyPressed = (reset = true) => {
    const { keyCode } = sk;
    switch (keyCode) {
      case 32:
        sk.saveCapture();
        return;
      default:
        break;
    }
    sk.background(255);
    if (reset) { resetGrid(); }
    const stringToSend = Math.random() > 0.3 ? String.fromCharCode(keyCode) : texts[Math.floor(Math.random() * 500)];
    sendTextCanvas(undefined, stringToSend);
    clearTimeout(sk.inputTimeout);
    if (!sk.toucheMoveArray) {
      sk.toucheMoveArray = [];
    }
    sk.inputTimeout = setTimeout(() => {
      if (sk.toucheMoveArray.length > 1) {
        resetGrid();
        if (sk.width < 512) {
          sendTextCanvas(undefined, sk.toucheMoveArray.join('').slice(sk.toucheMoveArray.length - 1));
        } else {
          sendTextCanvas(undefined, sk.toucheMoveArray.join(''));
        }
      }
      sk.toucheMoveArray = undefined;
    }, 400);
    sk.toucheMoveArray.push(stringToSend);
  };
  sk.handleTouchStart = (ev) => {
    ev.preventDefault();
    sk.staticBodyVertex = [];
  };
  setListeners(sk);
};
