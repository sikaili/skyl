import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';

export default (instance) => {
  const sk = instance;
  sk.settings = {
    dA: {
      value: 1,
      type: 'range',
      max: 5,
      min: 0.2,
      step: 0.1,
    },
    dB: {
      value: 0.5,
      type: 'range',
      max: 5,
      min: 0.2,
      step: 0.1,
    },
    feed: {
      value: 0.0545,
      type: 'range',
      max: 0.15,
      min: 0,
      step: 0.001,
    },
    k: {
      value: 0.062,
      type: 'range',
      max: 0.15,
      min: 0,
      step: 0.001,
    },
    t: {
      value: 1,
      type: 'range',
      max: 2,
      min: 0.1,
      step: 0.1,
    },
    actions: [{ name: 'saveCapture', icon: 'camera' }],
  };
  let grid;
  let next;
  const dA = () => +sk.settings.dA.value;
  const dB = () => +sk.settings.dB.value;
  const feed = () => +sk.settings.feed.value;
  const k = () => +sk.settings.k.value;
  const t = () => +sk.settings.t.value;
  const interval = () => 3;

  sk.stop = () => {
    clearInterval(sk.interval);
    sk.noLoop();
    sk.remove();
  };
  sk.saveCapture = () => {
    if (sk.pixelDensity() > 0.8) {
      sk.pixelDensity(10);
      sk.redraw();
      sk.saveCanvas(document.querySelector('canvas'), 'reaction', 'png');
      sk.pixelDensity(1);
      sk.redraw();
    }
  };
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.pixelDensity(1);
    grid = [];
    next = [];
    sk.strokeCap(sk.SQUARE);

    for (let x = 0; x < sk.width / interval() + 2; x += 1) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < sk.height / interval() + 2; y += 1) {
        grid[x][y] = {
          a: 1,
          b: 0,
        };
        next[x][y] = {
          a: 1,
          b: 0,
        };
        grid[x][y].display = false;
        next[x][y].display = false;
      }
    }
  };


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

  sk.interval = setInterval(() => {
    if (grid) {
      for (let x = 1; x < grid.length - 1; x += 1) {
        for (let y = 1; y < grid[1].length - 1; y += 1) {
          const { a } = grid[x][y];
          const { b } = grid[x][y];
          const laplaceAValue = laplaceA(x, y);
          const laplaceBValue = laplaceB(x, y);
          next[x][y].a = a + (dA() * laplaceAValue - a * b * b + feed() * (1 - a)) * t();
          next[x][y].b = b + (dB() * laplaceBValue + a * b * b - (k() + feed()) * b) * t();
          next[x][y].display = true;
          next[x][y].a = sk.constrain(next[x][y].a, 0, 1);
          next[x][y].b = sk.constrain(next[x][y].b, 0, 1);
        }
      }
      swap();
    }
  }, 5);
  sk.draw = () => {
    sk.background(255);
    for (let x = 1; x < grid.length; x += 1) {
      for (let y = 1; y < grid[0].length - 1; y += 1) {
        if (grid[x][y].display) {
          const { a } = grid[x][y];
          const { b } = grid[x][y];
          const c = Math.floor((a - b) * 255);
          if (c < 192) {
            sk.noStroke();
            sk.stroke(c, 255 - c);
            sk.strokeWeight(interval());
            sk.point(x * interval() - interval(), y * interval() - interval());
          }
        }
      }
    }
  };

  function swap() {
    const temp = grid;
    grid = next;
    next = temp;
  }
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        if (calDistance(lastPoint, { x: sk.mouseX, y: sk.mouseY }) > 0) {
          sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
          const gridPoint = { x: Math.floor(sk.mouseX / interval()), y: Math.floor(sk.mouseY / interval()) };
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
