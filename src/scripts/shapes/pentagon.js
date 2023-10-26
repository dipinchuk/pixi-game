import Shape from "./shape.js";

export default class Pentagon extends Shape {
  constructor(color, borderColor, x, y) {
    super("pentagon", color, borderColor, x, y);

    this.graphics.drawPolygon([25, 0, 0, 20, 10, 50, 40, 50, 50, 20]);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    let sideLength = 50;
    return (5 * sideLength * sideLength) / (4 * Math.tan(Math.PI / 5));
  }
}
