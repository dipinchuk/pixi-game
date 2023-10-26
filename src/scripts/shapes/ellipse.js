import Shape from "./shape.js";

export default class Ellipse extends Shape {
  constructor(color, borderColor, x, y) {
    super("ellipse", color, borderColor, x, y);

    this.graphics.drawEllipse(0, 0, 40, 20);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    const semiMajorAxis = 20;
    const semiMinorAxis = 40;
    return Math.PI * semiMajorAxis * semiMinorAxis;
  }
}
