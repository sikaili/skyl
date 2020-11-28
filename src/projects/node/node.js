import setListeners from '@/js/utlis/addEventListeners';

console.log('import node');

const sketch = (instance) => {
  const sk = instance;

  sk.start = () => {
    sk.loop();
  };

  sk.stop = () => {
    try {
      // sk.noLoop();
      sk.remove();
      console.log('node killed');
    } catch (err) {
      console.log(err);
    }
  };

  const points = [];

  sk.setup = () => {
    sk.canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.mouseX = sk.width / 2;
    sk.mouseY = sk.height / 2;
    // sk.loop();
  };
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.frameCount = sk.frameCount;
    }

    display() {
      for (let x = 0; x < sk.width; x += (sk.frameCount - this.frameCount) / 10) {
        sk.line(this.x, this.y, x, 0);
        sk.line(this.x, this.y, x, sk.height);
      }
      for (let y = 0; y < sk.height; y += (sk.frameCount - this.frameCount) / 10) {
        sk.line(this.x, this.y, sk.width, y);
        sk.line(this.x, this.y, 0, y);
      }
    }
  }

  sk.draw = () => {
    sk.background(Math.sin(sk.frameCount / 20) * 125 + 125, 255, 0);
    sk.fill(sk.random(0, 500));
    points.forEach((point) => {
      point.display();
    });
  };

  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };
  sk.touchEnded = () => {
    points.push(new Point(sk.mouseX, sk.mouseY));
  };

  setListeners(sk);
};

export default sketch;
