import Tone from 'tone';
import setListeners from '@/js/utlis/addEventListeners';
import decomp from 'poly-decomp';

import {
  Engine,
  World,
  Bodies,
  Composite,
  MouseConstraint,
  Runner,
  Mouse,
} from 'matter-js';
import Particle from './particles';
import E3 from '../virus/sound/chasing.mp3';
import D3 from '../virus/sound/light.mp3';

window.Tone = window.Tone ? window.Tone : Tone;

console.log('import bubbles');

const sketch = (instance) => {
  const sk = instance;
  const str = `660,nicomede workwear jacket;
119, nicomede shell jacket; 
48,acnes studio bag;
80,acnes studio t-shirt;
220,acnes studio parka;
144,acnes studio jumper;
37, uniclo;
27, muji;
288, kiko X ascis jacket;
110, adidas runner;
24,cos pantalons;
12,tabi sockets;
457,maison margiela tabi;`;
  const traiteStr = (str) => {
    const itemsArr = str.split(';').map((item) => ({
      price: item.trim().split(',')[0],
      name: item.trim().split(',')[1],
    }));
    return itemsArr;
  };
  const items = traiteStr(str);
  items.sort((a, b) => a.price - b.price);
  sk.settings = {
    type: 'large',
    gravity: {
      value: 1,
      type: 'range',
      max: 1.0,
      min: -1.0,
      step: 0.1,
    },
    newItem: {
      type: 'text',
    },
    actions: [{
      name: 'addParticles',
      icon: 'add',
    }, {
      name: 'clearParticles', icon: 'trash',
    }],
  };
  const divNode = document.querySelector('#canvasContainer');

  // save and get last
  sk.lastKey = localStorage.getItem('last-key') || 'notok';
  sk.thisKey = `OK${Date()}`;
  sk.get = (key = sk.lastKey) => JSON.parse(localStorage.getItem(key)) || [];
  sk.save = (item, key) => {
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem('last-key', key);
  };
  const meter = new Tone.Meter();
  Particle.prototype.sampler2 = new Tone.Sampler(
    { D3 },
    {
      onload: () => {
        sk.isLoaded = true;
      },
    },
  )
    .chain(new Tone.Volume(-12), Tone.Master)
    .connect(meter);

  Particle.prototype.samplers = [];
  for (let i = 0; i < 3; i += 1) {
    Particle.prototype.samplers[i] = new Tone.Sampler(
      { E3 },
      {
        onload: () => {
          sk.isLoaded = true;
        },
      },
    ).chain(new Tone.Volume(-15), Tone.Master);
  }

  const options = {
    positionIterations: 6,
    velocityIterations: 4,
    constraintIterations: 2,
    enableSleeping: true,
  };
  let engine = Engine.create(options);
  const setBordersAndMouse = () => {
    sk.borders = Composite.create();
    const thickness = 200;
    const border1 = Bodies.rectangle(-thickness, sk.height / 2, thickness * 2, sk.height, {
      isStatic: true,
    });
    const border2 = Bodies.rectangle(sk.width / 2, -thickness, sk.width, thickness * 2, {
      isStatic: true,
    });
    const border3 = Bodies.rectangle(sk.width + thickness, sk.height / 2, thickness * 2, sk.height, {
      isStatic: true,
    });
    const border4 = Bodies.rectangle(sk.width / 2, sk.height + thickness, sk.width, thickness * 2, {
      isStatic: true,
    });
    const divMouse = Mouse.create(divNode);
    const options = {
      mouse: divMouse,
      constraint: {
        stiffness: 1,
      },
    };
    const mouseConstraint = MouseConstraint.create(engine, options);
    Composite.add(sk.borders, [
      border1,
      border2,
      border3,
      border4,
      mouseConstraint,
    ]);
    World.add(engine.world, sk.borders);
  };
  let runner = Engine.run(engine);

  let looping = true;
  let particles = [];
  const touched = false;

  sk.start = () => {
    sk.loop();
  };

  sk.stop = () => {
    sk.noLoop();
    Runner.stop(runner);
    World.clear(engine.world, false, true);
    Engine.clear(engine);
    runner = null;
    engine = null;
    Tone.context.suspend();
    Particle.prototype.sampler2.dispose();
    Particle.prototype.samplers.map((a) => a.dispose());
    sk.remove();
    window.decomp = undefined;
    console.log('virus killed');
    particles = [];
  };

  sk.addParticles = (items) => {
    items.forEach((item, index) => {
      const particle = new Particle(
        sk.width / 2 + index * 5,
        50 * Math.floor((index / 3)),
        Math.sqrt(item.price) * 8,
        item,
      );
      particles.push(particle);
      World.add(engine.world, particle.body);
    });
  };
  sk.clearParticles = () => {
    virusNo = 3;
    particles.forEach((particle) => {
      Composite.remove(engine.world, particle.body);
    });
    particles = [];
  };

  sk.setup = () => {
    window.decomp = decomp;
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    console.log('setup virus');
    setBordersAndMouse(sk);
    sk.scaleRef = (sk.width + sk.height) / 2;
    sk.background(0);
    sk.noStroke();
    sk.strokeCap(sk.SQUARE);
    sk.rectMode(sk.CENTER);
    sk.textAlign(sk.CENTER);
    sk.textSize(sk.width < 600 ? 20 : 30);
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height / 2;
    sk.addParticles(items);
  };

  sk.draw = () => {
    engine.world.gravity.y = sk.settings.gravity.value;
    sk.noFill();
    sk.background([200, 200, 200, touched ? 150 : 255]);
    particles.forEach((particle) => {
      particle.display(sk);
    });
    if (touched) {
      sk.push();
      sk.stroke(0, 150);
      sk.strokeWeight(10);
      if (sk.staticBodyVertex) {
        sk.beginShape();
        sk.staticBodyVertex.forEach((point) => {
          sk.vertex(point.x + Math.random() * 3, point.y);
        });
        sk.endShape();
      }
      sk.pop();
    }
  };

  class Shape {
    constructor(body) {
      this.points = body.vertices;
      this.center = body.position;
      this.body = body;
    }

    display() {
      sk.push();
      sk.fill(this.body.isStatic ? 0 : [0, 50 + sk.noise(sk.frameCount / 20) * 255]);
      sk.fill(this.body.isStatic ? 0 : [0, 50 + sk.noise(sk.frameCount / 20) * 255]);
      sk.translate(this.body.position.x, this.body.position.y);
      sk.rotate(this.body.angle);
      sk.beginShape();
      this.points.forEach((point) => {
        sk.vertex(
          point.x - this.center.x - sk.noise(point.x + sk.frameCount / 20) * 15,
          point.y - this.center.y - sk.noise(point.y + sk.frameCount / 30) * 15,
        );
      });
      sk.endShape();
      sk.pop();
    }
  }

  sk.handleTouchEnd = (ev) => {
    ev.preventDefault();
  };
  sk.handleTouchMove = (ev) => {
    ev.preventDefault();
  };
  sk.handleTouchStart = (ev) => {
    ev.preventDefault();
  };

  sk.keyPressed = () => {
    switch (sk.keyCode) {
      case 32:
        sk.saveCapture();
        break;
      case 78:
        if (looping) {
          sk.noLoop();
          looping = !looping;
        } else {
          sk.loop();
          looping = !looping;
        }
        break;
      case 65:
        break;
      default:
    }
  };

  sk.saveCapture = () => {
    if (sk.pixelDensity() > 1) {
      sk.saveCanvas(document.querySelector('canvas'), `ok${Date()}`, 'png');
    }
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    Composite.clear(sk.borders);
    setBordersAndMouse();
  };
  setListeners(sk, Tone);
};

export default sketch;
