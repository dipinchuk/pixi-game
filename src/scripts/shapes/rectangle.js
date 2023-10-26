import Shape from "./shape.js";

export default class Rectangle extends Shape {
  constructor(color, borderColor, x, y) {
    super("rectangle", color, borderColor, x, y);

    this.graphics.drawRect(0, 0, 50, 50);
    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateArea() {
    const width = 50;
    const height = 50;
    return width * height;
  }
}
