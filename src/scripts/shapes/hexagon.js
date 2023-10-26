import Shape from "./shape.js";

export default class Hexagon extends Shape {
  constructor(color, borderColor, x, y) {
    super("hexagon", color, borderColor, x, y);

    this.graphics.drawPolygon([25, 0, 5, 15, 5, 35, 25, 50, 45, 35, 45, 15]);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    let sideLength = 50;
    return (3 * Math.sqrt(3) * sideLength * sideLength) / 2;
  }
}
