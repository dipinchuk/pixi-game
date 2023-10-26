// class Shape {
//     constructor(type, color, borderColor, x, y) {
//       this.type = type;
//       this.color = color;
//       this.borderColor = borderColor;
//       this.x = x;
//       this.y = y;
//       this.isShape = true;

//       this.graphics = new PIXI.Graphics();
//       this.graphics.lineStyle(1, this.borderColor);
//       this.graphics.beginFill(this.color);

//       switch (this.type) {
//         case "triangle":
//           this.graphics.drawPolygon([0, 0, 50, 0, 25, 50]);
//           break;
//         case "rectangle":
//           this.graphics.drawRect(0, 0, 50, 50);
//           break;
//         case "pentagon":
//           this.graphics.drawPolygon([25, 0, 0, 20, 10, 50, 40, 50, 50, 20]);
//           break;
//         case "hexagon":
//           this.graphics.drawPolygon([25, 0, 5, 15, 5, 35, 25, 50, 45, 35, 45, 15]);
//           break;
//         case "circle":
//           this.graphics.drawCircle(0, 0, 25);
//           break;
//         case "ellipse":
//           this.graphics.drawEllipse(0, 0, 40, 20);
//           break;
//         case "star":
//           const x = 0;
//           const y = 0;
//           const radius = 25;
//           const points = 5;
//           const innerRadius = 10;
//           const rotation = 0.5 * Math.PI;
//           this.graphics.drawPolygon(
//             this.calculateStarVertices(x, y, radius, points, innerRadius, rotation),
//           );
//           break;
//         default:
//           break;
//       }

//       this.graphics.endFill();
//       this.graphics.x = this.x;
//       this.graphics.y = this.y;
//     }

//     calculateStarVertices(x, y, radius, points, innerRadius, rotation) {
//       const angle = Math.PI / points;
//       const starVertices = [];

//       for (let i = 0; i < 2 * points; i++) {
//         const r = i % 2 === 0 ? radius : innerRadius;
//         const currX = x + Math.cos(i * angle + rotation) * r;
//         const currY = y + Math.sin(i * angle + rotation) * r;
//         starVertices.push(currX, currY);
//       }

//       return starVertices;
//     }

//     move(delta, gravity) {
//       this.y += gravity * delta;
//       this.graphics.y = this.y;
//     }

//     isVisible(height) {
//       return this.y + this.graphics.height > 0 && this.y < height;
//     }

//     calculateArea(shape) {
//       let height = 0;
//       let radius = 0;
//       let sideLength = 0;

//       switch (shape) {
//         case "triangle":
//           const base = 50;
//           height = 50;
//           return 0.5 * base * height;

//         case "rectangle":
//           const width = 50;
//           height = 50;
//           return width * height;

//         case "pentagon":
//           sideLength = 50;
//           return (5 * sideLength * sideLength) / (4 * Math.tan(Math.PI / 5));

//         case "hexagon":
//           sideLength = 50;
//           return (3 * Math.sqrt(3) * sideLength * sideLength) / 2;

//         case "circle":
//           radius = 25;
//           return Math.PI * Math.pow(radius, 2);

//         case "ellipse":
//           const semiMajorAxis = 20;
//           const semiMinorAxis = 40;
//           return Math.PI * semiMajorAxis * semiMinorAxis;

//         case "star":
//           radius = 25;
//           const points = 5;
//           const innerRadius = 10;
//           const angle = (2 * Math.PI) / (2 * points);
//           const area =
//             radius * radius * Math.sin(angle) + innerRadius * innerRadius * Math.sin(angle);
//           return (area * points) / 2;
//         default:
//           console.log("0");
//           return 0;
//       }
//     }
//   }

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
