import Shape from "./shape.js";

export default class Star extends Shape {
  constructor(color, borderColor, x, y) {
    super("star", color, borderColor, x, y);

    const coordinateX = 0;
    const coordinateY = 0;
    const radius = 25;
    const points = 5;
    const innerRadius = 10;
    const rotation = 0.5 * Math.PI;
    this.graphics.drawPolygon(
      this.calculateStarVertices(coordinateX, coordinateY, radius, points, innerRadius, rotation),
    );

    this.graphics.endFill();

    this.graphics.x = this.x;
    this.graphics.y = this.y;
  }

  calculateStarVertices(x, y, radius, points, innerRadius, rotation) {
    const angle = Math.PI / points;
    const starVertices = [];

    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? radius : innerRadius;
      const currX = x + Math.cos(i * angle + rotation) * r;
      const currY = y + Math.sin(i * angle + rotation) * r;
      starVertices.push(currX, currY);
    }

    return starVertices;
  }

  calculateArea() {
    const radius = 25;
    const points = 5;
    const innerRadius = 10;
    const angle = (2 * Math.PI) / (2 * points);
    const area = radius * radius * Math.sin(angle) + innerRadius * innerRadius * Math.sin(angle);
    return (area * points) / 2;
  }
}
