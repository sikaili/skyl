import calDistance from '@/js/utlis/calDistance';
import setListeners from '@/js/utlis/addEventListeners';
import QuadTree from '@/projects/quadtree/QuadTreeConstructor';

export default (instance) => {
  const sk = instance;
  sk.settings = {
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
  //     quadTree = new QuadTree(sk.width / 2, sk.height / 2, 400);
  //     quadTree.addPoint(point);
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
  // }, 100);

  const showRect = (x, y, d, points) => {
    sk.push();
    sk.noStroke();
    sk.fill(50, 800 / d);
    // sk.ellipse(x, y, d / 2 * (Math.sin(sk.frameCount / 100) + 2));
    // sk.stroke(128);
    if (d < 400) {
      sk.translate(x, y, Math.sin(sk.frameCount / 30 + x + y) * 50);
      // const dBox = d / 2 * (Math.sin(sk.frameCount / 100) + 2);
      sk.box(d / 2, d / 2, 400 / d);
      // const dC = d / 2 * (Math.cos(sk.frameCount / 100) + 2);
      if (points && points[0] && d < 50) {
        sk.translate(0, 0, points[0].z);
        sk.fill(255, 50, 50, 1000 / d);
        sk.sphere(d / 4);
      }
    }
    sk.pop();
  };
  let mousePositions = [];
  sk.draw = () => {
    sk.scale(1.5);
    sk.rotateX(1.1);
    sk.rotateZ(sk.frameCount / 150 + sk.mouseY / 100);
    sk.rotateY(sk.frameCount / 100 + sk.mouseX / 100);
    sk.translate(-sk.width / 2, -sk.height / 2);

    sk.background(0);
    sk.noFill();
    sk.points = Array(1000).fill(null).map((a, index) => ({
      x: sk.width / 2 + (sk.noise(index / 300 + sk.frameCount / 100) - 0.5) * 600,
      y: sk.height / 2 + (sk.noise(index / 200 + sk.frameCount / 60) - 0.5) * 600,
      z: 200 * (sk.noise(index / 500 + sk.frameCount / 120) - 0.5),
    }));
    mousePositions.push({
      x: sk.mouseX, y: sk.mouseY, z: 200 * (sk.noise(sk.frameCount / 120) - 0.5), timeStamp: sk.millis(),
    });
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
    // canvasPoints.forEach((point) => {
    //   const {
    //     x, y, active, noise,
    //   } = point;
    //   if (active) {
    //     sk.push();
    //     sk.noStroke();
    //     const d = interval;
    //     sk.fill(255 - noise * interval);
    //     sk.translate(x * interval, y * interval);
    //     sk.sphere(d / 2);
    //     sk.pop();
    //   }
    // });
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
