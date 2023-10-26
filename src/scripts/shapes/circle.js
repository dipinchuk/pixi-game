import Shape from "./shape.js";

export default class Circle extends Shape {
  constructor(color, borderColor, x, y) {
    super("circle", color, borderColor, x, y);

    this.graphics.drawCircle(0, 0, 25);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    let radius = 25;
    return Math.PI * Math.pow(radius, 2);
  }
}
