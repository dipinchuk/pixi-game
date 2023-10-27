import * as PIXI from "pixi.js";

export default class Shape {
  constructor(type, color, borderColor, x, y) {
    this.type = type;
    this.color = color;
    this.borderColor = borderColor;
    this.x = x;
    this.y = y;
    this.isShape = true;

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, this.borderColor);
    this.graphics.beginFill(this.color);
  }

  move(delta, gravity) {
    this.graphics.y += gravity * delta;
    console.log("h");
  }

  isVisible(height) {
    return this.graphics.y > -this.graphics.height && this.graphics.y < height;
  }

  calculateArea() {
    return 0;
  }
}
