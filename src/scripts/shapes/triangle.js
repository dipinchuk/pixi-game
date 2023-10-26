import Shape from "./shape.js";

export default class Triangle extends Shape {
  constructor(color, borderColor, x, y) {
    super("triangle", color, borderColor, x, y);

    this.graphics.drawPolygon([0, 0, 50, 0, 25, 50]);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    const base = 50;
    const height = 50;
    return 0.5 * base * height;
  }
}
