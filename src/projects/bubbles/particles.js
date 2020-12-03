import { Bodies, Body } from 'matter-js';

export default class Particle {
  constructor(x, y, r, item) {
    this.r = r;
    this.pos = { x, y };
    this.updating = true;
    this.body = Bodies.rectangle(x, y, this.r, this.r);
    this.item = item;
    this.fill = 255;
    this.isActive = false;
    Body.setMass(this.body, 20);
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
    this.fill = this.isActive ? 0 : 255;
    if (this.body.angularVelocity < 0.005) {
      this.updating = false;
    }
    sk.push();
    sk.rectMode(sk.CENTER);
    sk.translate(this.body.position.x, this.body.position.y);
    this.body.angle %= 3.1415;
    sk.rotate(this.body.angle);
    sk.stroke(0);
    sk.fill(this.fill);
    sk.rect(0, 0, this.r);
    sk.fill(0, 0);
    if (this.item && this.item.name) {
      sk.rotate(this.body.angle + this.body.angle / (3.14 / 4) * 3.14 / 2);
      sk.fill(200, (this.item.price / this.item.priceOrigin) * 255);
      sk.rect(0, 0, this.r / Math.sqrt((this.item.price / this.item.priceOrigin)));
      // const { angle } = this.body;
      // angle += (0 - angle) * 0.5;
      // sk.rotate(-angle * 0.5);
      sk.stroke(0, 125);
      sk.fill([200, 200, 200]);
      sk.ellipse(0, 0, this.r * (0.45 + 0.05 * (Math.sin(sk.frameCount / (this.item.price / 20)))));
      const fontBox = sk.font.textBounds(this.item.name.trim(), 0, -this.r / 2, sk.fontSize);
      // console.log(fontBox);
      sk.fill(0);
      sk.rectMode(sk.CORNER);
      sk.rect(fontBox.x - 10, fontBox.y, fontBox.w + 20, fontBox.h);
      sk.fill(255);
      sk.textFont(sk.font);
      sk.text(this.item.name.trim(), 0, -this.r / 2);
      // sk.text(this.item.price, 0, 40);
    }
    sk.pop();
    sk.stroke(0, 100);
    sk.line(this.body.position.x, this.body.position.y, (sk.typeArray.indexOf(this.item.type.trim()) + 0.5) * sk.length, sk.height / 2);
    sk.line(this.body.position.x, this.body.position.y, (sk.typeArray.indexOf(this.item.type.trim()) + 0.5) * sk.length, this.body.position.y > sk.height / 2 ? sk.height : 0);
    sk.fill(0);
  }
}
