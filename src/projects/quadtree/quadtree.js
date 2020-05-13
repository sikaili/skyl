import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';
import QuadTree from '@/projects/quadtree/QuadTreeConstructor';

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
  const interval = 8;
  const featurePointsNumber = 10;
  const canvasX = () => Math.ceil(sk.width / interval);
  const canvasY = () => Math.ceil(sk.height / interval);
  let canvasPoints = [];
  let quadTree;
  const setPoints = () => {
    const points = [];
    for (let x = 0; x < canvasX(); x += 1) {
      for (let y = 0; y < canvasY(); y += 1) {
        const n = y * canvasX() + x;
        points[n] = { x, y };
      }
    }
    return points;
  };
  sk.setup = () => {
    // sk.pixelDensity(1.0);
    sk.rectMode(sk.CENTER);
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL);
    sk.noStroke();
    featurePoints = Array(featurePointsNumber).fill(null).map((a) => ({ x: Math.random() * canvasX(), y: Math.random() * canvasY(), active: true }));
    canvasPoints = setPoints();
  };
  // sk.interval = setInterval(() => {
  //   if (featurePoints.every((point) => point.faster)) {
  //     setTimeout(() => {
  //       sk.noLoop();
  //     }, 40000);
  //   }
  //   featurePoints.forEach((point) => {
  //     const randomDuration = Math.floor(Math.random() * 250);
  //     if (sk.frameCount / randomDuration === 1) {
  //       point.faster = true;
  //     }
  //     if (point.active) {
  //       let velocityX = ((Math.random() - 0.5) * 8 * Math.sin(sk.frameCount / 30));
  //       let velocityY = ((Math.random() - 0.5) * 8 * Math.sin(sk.frameCount / 30));

  //       if (point.faster) {
  //         velocityX = (canvasX() / 2 - point.x) * 0.05;
  //         velocityY = (canvasY() / 2 - point.y) * 0.05;
  //       }
  //       point.x += velocityX;
  //       point.y += velocityY;
  //     }
  //   });
  //   canvasPoints.forEach((point) => {
  //     const distances = featurePoints.map((pointA) => ({ distance: calDistance(pointA, point), point: pointA }));
  //     distances.sort((a, b) => a.distance - b.distance);
  //     point.noise = distances[nth].distance;
  //     if (distances[nth].point.active) {
  //       point.active = true;
  //       if (distances[nth].point.faster) {
  //         point.noise *= 1.5;
  //       }
  //     } else {
  //       point.active = false;
  //     }
  //   });
  // }, 40);

  const showRect = (x, y, d, points) => {
    sk.push();
    sk.fill(0, 600 / d);
    sk.noStroke();
    // sk.ellipse(x, y, d / 2 * (Math.sin(sk.frameCount / 100) + 2));
    // sk.stroke(128);
    if (d < 400) {
      sk.translate(x, y);
      sk.box(d / 2, d / 2, 400 / d);
      if (points && points[0] && d < 50) {
        sk.translate(0, 0, points[0].z);
        sk.fill(255, 50, 50, 800 / d);
        sk.sphere(d / 4);
      }
    }
    sk.pop();
  };
  let mousePositions = [];
  sk.draw = () => {
    mousePositions.push({
      x: sk.mouseX, y: sk.mouseY, z: 200 * (sk.noise(sk.frameCount / 120) - 0.5), timeStamp: sk.millis(),
    });
    sk.scale(1.5);
    sk.rotateX(1.1);
    sk.rotateZ(sk.frameCount / 150);
    sk.rotateY(sk.frameCount / 100);

    sk.translate(-sk.width / 2, -sk.height / 2);
    sk.background(255);
    sk.noFill();
    sk.points = Array(1000).fill('').map((a, index) => ({
      x: sk.width / 2 + (sk.noise(index / 300 + sk.frameCount / 100) - 0.5) * 600,
      y: sk.height / 2 + (sk.noise(index / 200 + sk.frameCount / 60) - 0.5) * 600,
      z: 200 * (sk.noise(index / 500 + sk.frameCount / 120) - 0.5),
    }));
    sk.points = sk.points.concat(mousePositions);
    mousePositions = mousePositions.filter((position) => sk.millis() - position.timeStamp < 2000);
    quadTree = new QuadTree(sk.width / 2, sk.height / 2, 400);
    sk.points.forEach((point) => {
      quadTree.addPoint(point);
    });
    quadTree.showBorder(showRect);
    sk.stroke(255, 50, 50, 128);
    sk.points.forEach((point) => {
      sk.strokeWeight(5);
      sk.point(point.x, point.y, point.z);
    });
    mousePositions.forEach((point) => {
      sk.strokeWeight(20);
      sk.point(point.x, point.y, point.z);
    });
    // sk.noLoop();
    canvasPoints.forEach((point) => {
      const {
        x, y, active, noise,
      } = point;
      if (active) {
        sk.fill(255 - noise * interval);
        sk.ellipse(x * interval, y * interval, interval);
      }
    });
  };
  sk.handleTouchEnd = () => {
    sk.staticBodyVertex = undefined;
  };
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
    if (sk.staticBodyVertex) {
      if (sk.staticBodyVertex.length > 0) {
        const lastPoint = sk.staticBodyVertex[sk.staticBodyVertex.length - 1];
        const distance = calDistance(lastPoint, { x: sk.mouseX, y: sk.mouseY });
        if (distance > 0) {
          sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
          const gridPoint = { x: Math.floor(sk.mouseX / interval), y: Math.floor(sk.mouseY / interval) };
          canvasPoints.forEach((point) => {
            if (calDistance(point, gridPoint) < 10) {
              // point.active = false;
            }
          });
          featurePoints.forEach((point) => {
            if (calDistance(point, gridPoint) < 10) {
              point.faster = true;
            }
          });
        }
      } else {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
      }
    }
  };
  sk.handleTouchStart = (ev) => {
    ev.preventDefault();
    sk.staticBodyVertex = [];
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

  setListeners(sk);
};
