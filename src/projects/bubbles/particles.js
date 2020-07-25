import { Bodies, Body } from 'matter-js';

export default class Particle {
  constructor(x, y, r, item) {
    this.r = r;
    this.pos = { x, y };
    this.updating = true;
    this.body = Bodies.rectangle(x, y, this.r, this.r);
    this.item = item;
    this.fill = 255;
    Body.setMass(this.body, 3);
  }

  triggerAttack() {
    if (this.sampler2) {
      try {
        this.sampler2.triggerAttack(130 + (this.r - 20) * 2);
      } catch (err) {
        //
      }
    }
  }

  display(sk) {
    if (this.body.angularVelocity < 0.005) {
      this.updating = false;
    }
    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    this.body.angle %= 3.1415;
    sk.rotate(this.body.angle);
    sk.stroke(0);
    sk.fill(this.fill);
    sk.rect(0, 0, this.r);
    if (this.item && this.item.name) {
      sk.rotate(this.body.angle + this.body.angle / (3.14 / 4) * 3.14 / 2);
      // const { angle } = this.body;
      // angle += (0 - angle) * 0.5;
      // sk.rotate(-angle * 0.5);
      sk.stroke(0);
      sk.line(-this.r / 2, 0, 0, 0);
      sk.fill([255, 255, 255]);
      sk.ellipse(0, 0, this.r);
      sk.fill(0);
      sk.text(this.item.name.trim(), 0, -this.r / 2);
      sk.text(this.item.price, 0, 40);
    }
    sk.pop();
  }
}
