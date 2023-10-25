import * as PIXI from "pixi.js";

class Shape {
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

    switch (this.type) {
      case "triangle":
        this.graphics.drawPolygon([0, 0, 50, 0, 25, 50]);
        break;
      case "rectangle":
        this.graphics.drawRect(0, 0, 50, 50);
        break;
      case "pentagon":
        this.graphics.drawPolygon([25, 0, 0, 20, 10, 50, 40, 50, 50, 20]);
        break;
      case "hexagon":
        this.graphics.drawPolygon([25, 0, 5, 15, 5, 35, 25, 50, 45, 35, 45, 15]);
        break;
      case "circle":
        this.graphics.drawCircle(0, 0, 25);
        break;
      case "ellipse":
        this.graphics.drawEllipse(0, 0, 40, 20);
        break;
      case "star":
        const x = 0;
        const y = 0;
        const radius = 25;
        const points = 5;
        const innerRadius = 10;
        const rotation = 0.5 * Math.PI;
        this.graphics.drawPolygon(
          this.calculateStarVertices(x, y, radius, points, innerRadius, rotation),
        );
        break;
      default:
        break;
    }

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

  move(delta, gravity) {
    this.y += gravity * delta;
    this.graphics.y = this.y;
  }

  isVisible(height) {
    return this.y + this.graphics.height > 0 && this.y < height;
  }

  calculateArea(shape) {
    let height = 0;
    let radius = 0;
    let sideLength = 0;

    switch (shape) {
      case "triangle":
        const base = 50;
        height = 50;
        return 0.5 * base * height;

      case "rectangle":
        const width = 50;
        height = 50;
        return width * height;

      case "pentagon":
        sideLength = 50;
        return (5 * sideLength * sideLength) / (4 * Math.tan(Math.PI / 5));

      case "hexagon":
        sideLength = 50;
        return (3 * Math.sqrt(3) * sideLength * sideLength) / 2;

      case "circle":
        radius = 25;
        return Math.PI * Math.pow(radius, 2);

      case "ellipse":
        const semiMajorAxis = 20;
        const semiMinorAxis = 40;
        return Math.PI * semiMajorAxis * semiMinorAxis;

      case "star":
        radius = 25;
        const points = 5;
        const innerRadius = 10;
        const angle = (2 * Math.PI) / (2 * points);
        const area =
          radius * radius * Math.sin(angle) + innerRadius * innerRadius * Math.sin(angle);
        return (area * points) / 2;
      default:
        console.log("0");
        return 0;
    }
  }
}

class Game {
  constructor() {
    this.canvasWidth = /Mobi/.test(navigator.userAgent) ? 300 : 700;
    this.canvasHeight = 400;
    this.app = new PIXI.Application({
      width: this.canvasWidth,
      height: this.canvasHeight,
      backgroundColor: 0xffffff,
    });

    this.canvasContainer = document.getElementById("canva");
    this.canvasContainer.appendChild(this.app.view);

    this.canvas = new PIXI.Graphics();
    this.app.stage.addChild(this.canvas);
    this.shapes = [];
    this.timer = 0;
    this.timeInterval = 3000;
    this.shapeCreationInterval = null;
    this.gravity = 1;
    this.totalCount = 0;
    this.createdCountPerTimeInterval = 1;
    this.visibleShapesCount = 0;
    this.shapeTypes = ["triangle", "rectangle", "pentagon", "hexagon", "circle", "ellipse", "star"];
    this.grayColors = [0x808080, 0xa9a9a9, 0xc0c0c0, 0xd3d3d3, 0xdcdcdc];

    this.allShapesCheckbox = document.getElementById("include-all-shapes");
    this.shapeCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="include-shape"]');
    this.allColorCheckbox = document.getElementById("include-all-colors");
    this.colorCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="include-color"]');

    this.startShapeCreation();
    this.initEventListeners();
    this.checkSelectAllShapes();
    this.checkSelectAllColors();
    this.createRandomShape();

    setInterval(() => this.updateTimer(), 1000);

    this.app.ticker.add((delta) => {
      this.updateShapes(delta);
    });
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomGrayColor() {
    const availableColors = this.grayColors
      .filter((color) => document.getElementById(`include-color-${color}`).checked)
      .map((color) => color);

    if (availableColors.length === 0) {
      alert("Please select at least one color to include.");
      return;
    }

    return availableColors[Math.floor(Math.random() * availableColors.length)];
  }

  createRandomShape(coordinateX, coordinateY) {
    const availableShapes = this.shapeTypes
      .filter((shape) => document.getElementById(`include-shape-${shape}`).checked)
      .map((shape) => shape);

    if (availableShapes.length === 0) {
      alert("Please select at least one shape to include.");
      return;
    }

    const type = availableShapes[Math.floor(Math.random() * availableShapes.length)];
    const color = this.getRandomGrayColor();
    const borderColor = 0x000000;
    const x = coordinateX ? coordinateX : this.randomInRange(0, this.app.view.width - 50);
    const y = coordinateY ? coordinateY : -50;

    const newShape = new Shape(type, color, borderColor, x, y);
    newShape.graphics.on("pointerdown", (e) => {
      this.app.stage.removeChild(newShape.graphics);
      this.shapes = this.shapes.filter((shape) => shape !== newShape);
    });

    this.app.stage.addChild(newShape.graphics);
    this.shapes.push(newShape);
    this.updateVisibleShapesCount();
    document.getElementById("shape-count").textContent = `Shapes: ${++this.totalCount}`;
  }

  updateTimer() {
    if (this.timer >= this.timeInterval / 1000) {
      this.timer = 1;
    } else {
      this.timer++;
    }
    document.getElementById("timer").textContent = `Time: ${this.timer} s`;
  }

  startShapeCreation() {
    clearInterval(this.shapeCreationInterval);
    this.timer = 0;
    this.updateTimer();
    this.shapeCreationInterval = setInterval(() => this.createMultipleShapes(), this.timeInterval);
  }

  createMultipleShapes() {
    for (let i = 0; i < this.createdCountPerTimeInterval; i++) {
      this.createRandomShape();
    }
  }

  updateVisibleShapesCount() {
    this.visibleShapesCount = this.countVisibleShapes();
    document.getElementById(
      "visible-shapes-count",
    ).textContent = `Visible shapes: ${this.visibleShapesCount}`;
  }

  countVisibleShapes() {
    let count = 0;
    for (const shape of this.shapes) {
      if (shape.isVisible(this.app.view.height)) {
        count++;
      }
    }
    return count;
  }

  updateShapes(delta) {
    for (const shape of this.shapes) {
      shape.move(delta, this.gravity);
    }

    this.updateVisibleShapesCount();
    this.updateTotalArea();
  }

  updateTotalArea() {
    let totalArea = 0;
    for (const shape of this.shapes) {
      if (shape.isVisible(this.app.view.height)) {
        totalArea += shape.calculateArea(shape.type);
      }
    }
    document.getElementById("total-area").textContent = `Total Area: ${totalArea.toFixed(0)} px²`;
  }

  initEventListeners() {
    document.getElementById("decrease-gravity").disabled = true;
    document.getElementById("decrease-shapes").disabled = true;

    this.app.renderer.view.addEventListener("mousedown", (e) => this.handleCanvasClick(e));

    document
      .getElementById("increase-gravity")
      .addEventListener("click", () => this.increaseGravity());
    document
      .getElementById("decrease-gravity")
      .addEventListener("click", () => this.decreaseGravity());
    document
      .getElementById("increase-interval")
      .addEventListener("click", () => this.increaseInterval());
    document
      .getElementById("decrease-interval")
      .addEventListener("click", () => this.decreaseInterval());
    document
      .getElementById("increase-shapes")
      .addEventListener("click", () => this.increaseShapes());
    document
      .getElementById("decrease-shapes")
      .addEventListener("click", () => this.decreaseShapes());

    document
      .getElementById("shapes-value")
      .addEventListener("input", (e) => this.handleShapesInput(e));
    document
      .getElementById("interval-value")
      .addEventListener("input", (e) => this.handleIntervalInput(e));
    document
      .getElementById("gravity-value")
      .addEventListener("input", (e) => this.handleGravityInput(e));

    this.allShapesCheckbox.addEventListener("change", () => this.handleAllShapesChange());

    for (const checkbox of this.shapeCheckboxes) {
      checkbox.addEventListener("change", () => this.handleShapeChange(checkbox));
    }

    this.allColorCheckbox.addEventListener("change", () =>
      this.handleAllColorsChange(this.allColorCheckbox),
    );

    for (const checkbox of this.colorCheckboxes) {
      checkbox.addEventListener("change", () => this.handleColorChange(checkbox));
    }

    this.startShapeCreation();
  }

  handleCanvasClick(e) {
    const x = e.clientX - this.app.renderer.view.getBoundingClientRect().left;
    const y = e.clientY - this.app.renderer.view.getBoundingClientRect().top;

    let topMostShape = null;

    for (const shape of this.shapes) {
      if (shape.graphics.containsPoint(new PIXI.Point(x, y))) {
        if (
          !topMostShape ||
          this.app.stage.getChildIndex(shape.graphics) >
            this.app.stage.getChildIndex(topMostShape.graphics)
        ) {
          topMostShape = shape;
        }
      }
    }

    if (topMostShape) {
      this.app.stage.removeChild(topMostShape.graphics);
      this.shapes = this.shapes.filter((shape) => shape !== topMostShape);
    } else {
      this.createRandomShape(x, y);
    }

    this.updateVisibleShapesCount();
    this.updateTotalArea();
  }

  updateIntervalDisplay() {
    document.getElementById("interval-value").value = this.timeInterval;
  }

  updateGravityDisplay() {
    document.getElementById("gravity-value").value = this.gravity;
  }

  updateCountPerTimeIntervalDisplay() {
    document.getElementById("shapes-value").value = this.createdCountPerTimeInterval;
  }

  increaseInterval() {
    this.timeInterval += 1000;
    this.updateIntervalDisplay();
    document.getElementById("decrease-interval").disabled = false;
    clearInterval(this.shapeCreationInterval);
    this.startShapeCreation();
    this.updateTimer();
  }

  decreaseInterval() {
    if (this.timeInterval > 2000) {
      this.timeInterval -= 1000;
    } else {
      this.timeInterval = 1000;
      document.getElementById("decrease-interval").disabled = true;
    }
    this.updateIntervalDisplay();
    clearInterval(this.shapeCreationInterval);
    this.startShapeCreation();
    this.updateTimer();
  }

  increaseShapes() {
    this.createdCountPerTimeInterval += 1;
    this.updateCountPerTimeIntervalDisplay();
    document.getElementById("decrease-shapes").disabled = false;
  }

  decreaseShapes() {
    if (this.createdCountPerTimeInterval > 2) {
      this.createdCountPerTimeInterval -= 1;
    } else {
      this.createdCountPerTimeInterval = 1;
      document.getElementById("decrease-shapes").disabled = true;
    }
    this.updateCountPerTimeIntervalDisplay();
  }

  increaseGravity() {
    this.gravity += 1;
    this.updateGravityDisplay();
    document.getElementById("decrease-gravity").disabled = false;
  }

  decreaseGravity() {
    if (this.gravity > 2) {
      this.gravity -= 1;
    } else {
      this.gravity = 1;
      document.getElementById("decrease-gravity").disabled = true;
    }
    this.updateGravityDisplay();
  }

  handleShapesInput(e) {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue <= 1) {
        this.createdCountPerTimeInterval = 1;
        document.getElementById("decrease-shapes").disabled = true;
      } else {
        this.createdCountPerTimeInterval = newValue;
        document.getElementById("decrease-shapes").disabled = false;
      }
    } else {
      this.createdCountPerTimeInterval = 1;
      document.getElementById("decrease-shapes").disabled = true;
    }
    this.updateCountPerTimeIntervalDisplay();
  }

  handleIntervalInput(e) {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1000) {
      if (newValue <= 1000) {
        this.timeInterval = 1000;
        document.getElementById("decrease-interval").disabled = true;
      } else {
        this.timeInterval = newValue;
        document.getElementById("decrease-interval").disabled = false;
      }
    } else {
      this.timeInterval = 1000;
      document.getElementById("decrease-interval").disabled = true;
    }
    this.updateIntervalDisplay();
    clearInterval(this.shapeCreationInterval);
    this.startShapeCreation();
    this.updateTimer();
  }

  handleGravityInput(e) {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue <= 1) {
        this.gravity = 1;
        document.getElementById("decrease-gravity").disabled = true;
      } else {
        this.gravity = newValue;
        document.getElementById("decrease-gravity").disabled = false;
      }
    } else {
      this.gravity = 1;
      document.getElementById("decrease-gravity").disabled = true;
    }
    this.updateGravityDisplay();
  }

  handleAllShapesChange() {
    for (const checkbox of this.shapeCheckboxes) {
      checkbox.checked = this.allShapesCheckbox.checked;
    }
    this.checkSelectAllShapes();
  }

  handleShapeChange(checkbox) {
    this.checkSelectAllShapes();
    if (!checkbox.checked) {
      this.allShapesCheckbox.checked = false;
    } else {
      const inactiveShapeCheckboxes = Array.from(this.shapeCheckboxes).filter(
        (checkbox) => !checkbox.checked,
      );
      if (inactiveShapeCheckboxes.length === 0) {
        this.allShapesCheckbox.disabled = true;
      } else {
        this.allShapesCheckbox.disabled = false;
      }
    }
  }

  checkSelectAllShapes() {
    const selectedShapeCheckboxes = Array.from(this.shapeCheckboxes).filter(
      (checkbox) => checkbox.checked,
    );

    const allSelected = selectedShapeCheckboxes.length === this.shapeCheckboxes.length;
    this.allShapesCheckbox.disabled = allSelected;

    for (const checkbox of this.shapeCheckboxes) {
      if (checkbox !== this.allShapesCheckbox) {
        checkbox.disabled = false;
      }
    }

    if (selectedShapeCheckboxes.length <= 1) {
      for (const checkbox of selectedShapeCheckboxes) {
        checkbox.checked = false;
      }
      if (selectedShapeCheckboxes.length === 1) {
        const firstSelected = selectedShapeCheckboxes[0];
        firstSelected.checked = true;
        firstSelected.disabled = true;
      }
    }

    const inactiveShapeCheckboxes = Array.from(this.shapeCheckboxes).filter(
      (checkbox) => !checkbox.checked,
    );

    if (inactiveShapeCheckboxes.length === 1) {
      this.allShapesCheckbox.checked = false;
      this.allShapesCheckbox.disabled = false;
    } else if (inactiveShapeCheckboxes.length === 0) {
      this.allShapesCheckbox.checked = true;
      this.allShapesCheckbox.disabled = true;
    } else {
      this.allShapesCheckbox.disabled = false;
    }
  }

  handleAllColorsChange() {
    for (const checkbox of this.colorCheckboxes) {
      checkbox.checked = this.allColorCheckbox.checked;
    }
    this.checkSelectAllColors();
  }

  handleColorChange(checkbox) {
    this.checkSelectAllColors();
    if (!checkbox.checked) {
      this.allColorCheckbox.checked = false;
    } else {
      const inactiveColorCheckboxes = Array.from(checkbox).filter((checkbox) => !checkbox.checked);
      if (inactiveColorCheckboxes.length === 0) {
        this.allColorCheckbox.disabled = true;
      } else {
        this.allColorCheckbox.disabled = false;
      }
    }
  }

  checkSelectAllColors() {
    const selectedColorCheckboxes = Array.from(this.colorCheckboxes).filter(
      (checkbox) => checkbox.checked,
    );

    const allSelected = selectedColorCheckboxes.length === this.colorCheckboxes.length;
    this.allColorCheckbox.disabled = allSelected;

    for (const checkbox of this.colorCheckboxes) {
      if (checkbox !== this.allColorCheckbox) {
        checkbox.disabled = false;
      }
    }

    if (selectedColorCheckboxes.length <= 1) {
      for (const checkbox of selectedColorCheckboxes) {
        checkbox.checked = false;
      }
      if (selectedColorCheckboxes.length === 1) {
        const firstSelected = selectedColorCheckboxes[0];
        firstSelected.checked = true;
        firstSelected.disabled = true;
      }
    }

    const inactiveColorCheckboxes = Array.from(this.colorCheckboxes).filter(
      (checkbox) => !checkbox.checked,
    );

    if (inactiveColorCheckboxes.length === 1) {
      this.allColorCheckbox.checked = false;
      this.allColorCheckbox.disabled = false;
    } else if (inactiveColorCheckboxes.length === 0) {
      this.allColorCheckbox.checked = true;
      this.allColorCheckbox.disabled = true;
    } else {
      this.allColorCheckbox.disabled = false;
    }
  }
}

const game = new Game();
