export default class QuadTree {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.divided = false;
    this.capacity = 10;
    this.points = [];
  }

  addPoint(point) {
    if (!this.divided) {
      if (this.points.length < this.capacity) {
        if (this.isInRange(point)) {
          this.points.push(point);
        }
      } else if (this.d > 1) {
        this.divide(point);
        this.divided = true;
      }
    } else {
      ['lt', 'rt', 'lb', 'rb'].forEach((corner) => this[corner].addPoint(point));
    }
  }

  divide(point) {
    this.lt = new QuadTree(this.x - this.d / 4, this.y - this.d / 4, this.d / 2);
    this.rt = new QuadTree(this.x + this.d / 4, this.y - this.d / 4, this.d / 2);
    this.lb = new QuadTree(this.x - this.d / 4, this.y + this.d / 4, this.d / 2);
    this.rb = new QuadTree(this.x + this.d / 4, this.y + this.d / 4, this.d / 2);
    ['lt', 'rt', 'lb', 'rb'].forEach((corner) => this[corner].addPoint(point));
  }

  isInRange(point) {
    const { x, y } = point;
    return x > (this.x - this.d / 2) && x < (this.x + this.d / 2) && y > (this.y - this.d / 2) && y < (this.y + this.d / 2);
  }

  query(range, points = []) {
    const collision = true;
    if (collision) {
      const points = this.points.filter();
    }
  }

  showBorder(display) {
    if (this.d < 1) {
      return;
    }
    display(this.x, this.y, this.d, this.points);
    if (this.divided) {
      ['lt', 'rt', 'lb', 'rb'].forEach((corner) => this[corner].showBorder(display));
    }
  }
}
