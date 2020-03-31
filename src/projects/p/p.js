import Tone from "tone";
import F3 from "./sound/light.mp3";
import E3 from "./sound/bouton_reverb.mp3";
console.log("import p");

export default function(instance) {
  const divNode = document.querySelector("#canvasContainer");
  const sampler0 = new Tone.Sampler(
    { F3 },
    {
      onload: () => {
        this.isLoaded = true;
      }
    }
  ).chain(new Tone.Volume(-12), Tone.Master);
  const sampler1 = new Tone.Sampler(
    { E3 },
    {
      onload: () => {
        this.isLoaded = true;
      }
    }
  ).chain(new Tone.Volume(-12), Tone.Master);
  const sk = instance;
  let intervalX;
  let intervalY;
  const RotateObjects = [];
  let luckyNo;
  let loading = true;
  const sound = [];
  sk.stop = () => {
    sk.noLoop();
    sk.remove();
    RotateObjects.map(a => {
      a = undefined;
    });
    Object.entries(prop => delete sk[prop]);
    console.log("p is killed");
  };
  class RotateObject {
    constructor(x, y, r) {
      this.id = sk.noise(x, y) * 100;
      this.x = x;
      this.y = y;
      [this.r, this.rCircle, this.rOriginal] = [r, r, r];
      this.mode = "normal";
      this.playble = false;
      this.rot = false;
    }

    bigger() {
      this.r *= this.id / 20;
      this.rCircle += this.id;
    }

    update(x1, y1) {
      let distance = sk.calcDistance(x1, y1, this.x, this.y);
      if (distance < this.rOriginal * 4) {
        this.mode = "inside";
      } else {
        this.mode = "outside";
        distance *= 2.2;
      }
      this.r =
        ((sk.noise(sk.frameCount / 100, this.x / 100, this.y) *
          this.rOriginal) /
          2) *
          2 +
        30 -
        (distance / this.rOriginal) * 2;
      this.rCircle =
        sk.noise(Math.sin(sk.frameCount / 60), this.x / 100) *
          this.rOriginal *
          1.5 +
        10 -
        distance / 400;
      this.r =
        ((sk.noise(
          sk.frameCount / 100,
          sk.calcDistance(sk.mouseX, sk.mouseY, this.x, this.y) / 150 +
            sk.frameCount / 40
        ) *
          this.rOriginal) /
          2) *
          2 +
        30 -
        distance / 20;
      this.rCircle =
        sk.noise(
          Math.sin(sk.frameCount / 60),
          sk.calcDistance(sk.mouseX, sk.mouseY, this.x, this.y) / 300 +
            sk.frameCount / 100
        ) *
          this.rOriginal *
          1.5 +
        10 -
        distance / 400;
    }

    display(color) {
      sk.push();
      sk.translate(this.x, this.y);
      sk.push();
      if (!this.playble || this.rot) {
        sk.rotate(this.r);
      }
      sk.fill(this.playble ? 0 : [255, 0, 0]);
      const scal = 1;
      sk.rect(0, 0, this.r * scal, this.r);
      sk.fill(0, 0, 200, 80);
      sk.beginShape();
      switch (this.mode) {
        case "inside": {
          sk.vertex(0, -this.r / 2);
          sk.vertex(this.r / 2, this.r / 2);
          sk.vertex(-this.r / 2, this.r / 2);
          break;
        }
        default: {
          // return;
        }
      }
      sk.endShape(sk.CLOSE);
      sk.pop();
      sk.push();
      sk.fill([0, 40, 49, 100]);
      if (color) {
        sk.fill(color);
        sk.ellipse(0, 0, this.rCircle, this.rCircle);
        this.playble = true;
      }
      if (this.playble) {
        sk.fill(0, this.id, this.id * 2);
        this.rCircle /= 2;
      }
      sk.ellipse(0, 0, this.rCircle, this.rCircle);
      sk.pop();
      sk.pop();
    }
  }

  sk.setup = () => {
    loading = false;
    sk.scale(1.5);
    const canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    canvas.id = Math.random().toFixed(2);
    sk.noCursor();
    sk.noStroke();
    [intervalX, intervalY] = [
      (sk.width + sk.height) / 40,
      (sk.width + sk.height) / 40
    ];
    sk.rectMode(sk.CENTER);
    let number = 0;
    for (let i = 0; i < sk.width + intervalX; i += intervalX) {
      for (let t = 0; t < sk.height + intervalY; t += intervalY) {
        RotateObjects[number] = new RotateObject(i, t, intervalX);
        number += 1;
      }
    }
    // setInterval(() => {
    //   luckyNo = Math.floor(Math.random() * number);
    // }, 1000);
  };

  sk.draw = () => {
    let fps = sk.frameRate();
    if (sk.keyIsPressed) {
      const min = RotateObjects.filter(
        obj => sk.calcDistance(obj.x, obj.y, sk.mouseX, sk.mouseY) < intervalX
      ).sort()[0];
      luckyNo = RotateObjects.indexOf(min);
    }
    const level = 0.03;
    sk.background(150, 50 * (1 + level * 200), 200);
    for (let i = 0; i < RotateObjects.length; i += 1) {
      const obj = RotateObjects[i];
      obj.update(sk.mouseX, sk.mouseY);
      if (obj.mode === "inside") {
        sk.vertex(obj.x, obj.y);
      }
      if (!loading) {
        if (
          sk.calcDistance(sk.mouseX, sk.mouseY, obj.x, obj.y) < 100 &&
          obj.playble
        ) {
          obj.bigger();
          obj.rot = true;
          sampler0.triggerAttack(obj.id * 10);
        } else {
          obj.rot = false;
        }
      }
      if (luckyNo === i) {
        obj.display([255, 0, 0, 100]);
      } else {
        obj.display();
      }
    }
    sk.push();
    sk.fill(255);
    sk.stroke(0);
    sk.text("FPS: " + fps.toFixed(2), 10, sk.height - 10);
    sk.pop();
  };

  sk.handleTouchStarted = () => {
    const min = RotateObjects.filter(
      obj => sk.calcDistance(obj.x, obj.y, sk.mouseX, sk.mouseY) < intervalX
    ).sort()[0];
    luckyNo = RotateObjects.indexOf(min);
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };

  sk.calcDistance = (x, y, x1, y1) => {
    return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
  };

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

  divNode.addEventListener("touchstart", sk.handleTouchStarted, {
    passive: false
  });

  divNode.addEventListener("mousedown", sk.handleTouchStarted, {
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
      ev.preventDefault();
    },
    { passive: false }
  );
}
