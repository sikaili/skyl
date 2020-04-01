import Tone from "tone";
import decomp from "poly-decomp";
window.decomp = decomp;

import {
  Engine,
  World,
  Bodies,
  MouseConstraint,
  Runner,
  Mouse,
  Vertices
} from "matter-js";
import Particle from "./sub/particles";
import E3 from "./sound/chasing.mp3";
import D3 from "./sound/light.mp3";

console.log("import virus");

const sketch = sk => {
  const divNode = document.querySelector("#canvasContainer");

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
    Particle.prototype.samplers.map(a => a.dispose());
    sk.remove();
    particles.map(a => {
      a = undefined;
    });
    particles = [];
    window.decomp = undefined;
    console.log("virus killed");
  };

  // save and get last
  sk.lastKey = localStorage.getItem("last-key") || "notok";
  sk.thisKey = `OK${Date()}`;
  sk.get = (key = sk.lastKey) => {
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  sk.save = (item, key) => {
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem("last-key", key);
  };

  Particle.prototype.sampler2 = new Tone.Sampler(
    { D3 },
    {
      onload: () => {
        this.isLoaded = true;
      }
    }
  ).chain(new Tone.Volume(-12), Tone.Master);

  Particle.prototype.samplers = [];
  for (let i = 0; i < 3; i += 1) {
    Particle.prototype.samplers[i] = new Tone.Sampler(
      { E3 },
      {
        onload: () => {
          this.isLoaded = true;
        }
      }
    ).chain(new Tone.Volume(-15), Tone.Master);
  }

  let options = {
    positionIterations: 6,
    velocityIterations: 4,
    constraintIterations: 2,
    enableSleeping: true
  };
  let engine = Engine.create(options);
  const setBordersAndMouse = () => {
    const border1 = Bodies.rectangle(0, 0, 10, 4000, {
      isStatic: true
    });
    const border2 = Bodies.rectangle(sk.width, 0, 10, 4000, {
      isStatic: true
    });
    const border3 = Bodies.rectangle(0, 0, 4000, 10, {
      isStatic: true
    });
    const border4 = Bodies.rectangle(0, sk.height, 4000, 10, {
      isStatic: true
    });
    const divMouse = Mouse.create(divNode);
    const options = {
      mouse: divMouse,
      constraint: {
        stiffness: 0.2
      }
    };
    const mouseConstraint = MouseConstraint.create(engine, options);
    World.add(engine.world, [
      border1,
      border2,
      border3,
      border4,
      mouseConstraint
    ]);
  };
  engine.world.gravity.y = 0;
  let runner = Engine.run(engine);

  let looping = true;
  let particles = [];
  let virusNo = 3 + Math.floor(Math.random() * 3);
  const number = 211 + Math.floor(Math.random() * 50);
  let cursor = {
    color: [Math.random() * 120, Math.random() * 120, Math.random() * 120, 255],
    r: 80,
    text: `virus ${virusNo}`
  };
  let touched = false;
  let shapes = [];
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    console.log("setup virus");
    setBordersAndMouse(sk);
    sk.scaleRef = (sk.width + sk.height) / 2;
    sk.background(0);
    sk.noStroke();
    sk.strokeCap(sk.SQUARE);
    sk.rectMode(sk.CENTER);
    sk.textAlign(sk.CENTER);
    sk.textSize(40);
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height / 2;
    for (let i = 0; i < number; i += 1) {
      particles[i] = new Particle(
        sk.random(0, sk.width),
        sk.random(0, sk.height),
        false,
        number * (1000 / (sk.width + sk.height))
      );
      World.add(engine.world, particles[i].body);
    }
  };

  sk.draw = () => {
    sk.background(200, 200, 200);
    sk.noFill();
    particles.forEach(particle => {
      if (!particle.updating) {
        particle.contagion(particles);
      }
      if (touched && sk.trigger) {
        particle.mouseForceTrigger({ x: sk.mouseX, y: sk.mouseY });
      }
      particle.display(sk);
    });
    if (touched) {
      sk.push();
      sk.stroke(0);
      sk.line(sk.pmouseX, sk.pmouseY, sk.mouseX, sk.mouseY);
      sk.pop();
    }
    // curso
    sk.push();
    sk.fill([...cursor.color.slice(0, 3), 100]);
    shapes.forEach(shape => {
      shape.display();
    });
    sk.ellipse(sk.mouseX, sk.mouseY, cursor.r);
  };

  sk.addVirus = () => {
    const virus = {
      color: cursor.color,
      id: virusNo - 1
    };
    const particle = new Particle(sk.mouseX, sk.mouseY, virus, number);
    particles.push(particle);
    World.add(engine.world, particle.body);
    setTimeout(() => {
      // random to 120 is good
      const scale = Math.random() * 255;
      cursor.color =
        virusNo > 0
          ? [
              Math.random() * scale,
              Math.random() * scale,
              Math.random() * scale,
              255
            ]
          : [100, 100, 100, 100];
      cursor.text = `virus ${virusNo}`;
    }, 50);
  };

  class Shape {
    constructor(points, center) {
      this.points = points;
      this.center = center;
    }
    display() {
      sk.push();
      sk.fill(0);
      sk.stroke(0);
      sk.translate(this.center.x, this.center.y);
      sk.beginShape();
      this.points.map(point => {
        sk.vertex(point.x, point.y);
      });
      sk.endShape();
      sk.pop();
    }
  }

  sk.handleTouchEnd = ev => {
    ev.preventDefault();
    // add shape
    let center = Vertices.centre(sk.staticBodyVertex);
    let arr = sk.staticBodyVertex.map(point => {
      return { x: point.x - center.x, y: point.y - center.y };
    });

    if (sk.staticBodyVertex.length > 5) {
      let stop = Bodies.fromVertices(center.x, center.y, [arr], {
        isStatic: true
      });
      World.add(engine.world, stop);
      let stopShape = new Shape(arr, center);
      shapes.push(stopShape);
    }

    touched = false;

    if (virusNo > 0 && sk.mouseX + sk.mouseY > 10) {
      sk.addVirus();
      virusNo -= 1;
    } else {
      cursor = { color: [100, 100, 100, 100], r: 40, text: "" };

      // dead by click
      particles.forEach(particle => {
        if (Math.random() > 0.95 && particle.virus && !particle.died) {
          particle.died = true;
          particle.triggerAttack();
        }
      });
    }
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
      sk.saveCanvas(document.querySelector("canvas"), `ok${Date()}`, "png");
    }
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };

  const setListeners = (divNode, sk) => { //eslint-disable-line
    divNode.addEventListener(
      "click",
      async () => {
        await Tone.start();
        sk.start();
      },
      { once: true, passive: false }
    );
    divNode.addEventListener(
      "touchstart",
      async () => {
        await Tone.start();
        sk.start();
      },
      { once: true, passive: false }
    );
    divNode.addEventListener(
      "touchstart",
      () => {
        touched = true;
        sk.staticBodyVertex = [];
        sk.trigger = true;
        setTimeout(() => {
          sk.trigger = false;
        }, 300);
      },
      {
        passive: false
      }
    );

    divNode.addEventListener(
      "mousedown",
      () => {
        touched = true;
      },
      {
        passive: false
      }
    );

    divNode.addEventListener("touchend", sk.handleTouchEnd, {
      passive: false
    });

    divNode.addEventListener("mouseup", sk.handleTouchEnd, {
      passive: false
    });

    divNode.addEventListener(
      "ontouchmove",
      m => {
        m.preventDefault();
      },
      { passive: false }
    );

    divNode.addEventListener(
      "touchmove",
      ev => {
        sk.staticBodyVertex.push({ x: sk.mouseX, y: sk.mouseY });
        ev.preventDefault();
      },
      { passive: false }
    );
  };

  setListeners(divNode, sk);
};

export default sketch;
