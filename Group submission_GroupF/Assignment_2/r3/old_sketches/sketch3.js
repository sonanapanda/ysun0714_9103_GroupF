let sketches = [];
let olive = [0.50, 0.7, 0.5, 1];
let scene;

function preload() {
  sketches.push(new Sketch("body.csv", [1, 1, 1, 1]));
  sketches.push(new Sketch("Rwing.csv", [1, 1, 1, 0.9]));
  sketches.push(new Sketch("Lwing.csv", [1, 1, 0.5, 1]));
  sketches.push(new Sketch("eye.csv", [0.6, 0.6, 0.6, 0.5]));
  sketches.push(new Sketch("branch.csv", olive));
  sketches.push(new Sketch("leaf1.csv", olive));
  sketches.push(new Sketch("leaf2.csv", olive));
  sketches.push(new Sketch("leaf3.csv", olive));
  sketches.push(new Sketch("leaf4.csv", olive));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  scene = new Scene(width, height);
  sketches.forEach(sketch => sketch.loadPoints());
}

function draw() {
  scene.displayBackground();

  sketches[0].animateOscillation(0, 50);
  sketches[3].animateOscillation(0, 50);

  sketches[4].animateOscillation(0, 50);
  sketches[5].animateOscillation(0, 50);
  sketches[6].animateOscillation(0, 50);
  sketches[7].animateOscillation(0, 50);
  sketches[8].animateOscillation(0, 50);

  sketches[1].animateRotation(80, 50, 200, PI / 4, 0.05);
  sketches[2].animateRotation(0, 40, 220, PI / 4, 0.05, -1,-1);
}

// Scene class to handle background drawing
class Scene {
  constructor(w, h) {
    this.buffer = createGraphics(w, h);
    this.drawGradient();
  }

  drawGradient() {
    let c1 = color(255);
    let c2 = color(100, 160, 255);
    this.buffer.noFill();
    for (let y = 0; y < this.buffer.height; y++) {
      let inter = map(y, 0, this.buffer.height, 0, 1);
      this.buffer.stroke(lerpColor(c1, c2, inter));
      this.buffer.line(0, y, this.buffer.width, y);
    }
  }

  displayBackground() {
    push();
    texture(this.buffer);
    plane(width, height);
    pop();
  }
}

// Sketch class for each loaded file
class Sketch {
  constructor(filename, color) {
    this.table = loadTable("assets/" + filename, "csv", "header");
    this.color = color;
    this.points = [];
    this.minX = 0;
    this.maxX = 200;
    this.minY = 0;
    this.maxY = 200;
  }

  static create(filename, color) {
    let table = loadTable("assets/" + filename, "csv", "header");
    return new Sketch(table, color);
  }

  loadPoints() {
    for (let i = 0; i < this.table.getRowCount(); i++) {
      let row = this.table.getRow(i);
      let id = row.getNum('Point #');
      let x = row.getNum('X');
      let y = row.getNum('Y');
      let adjustedX = map(x, this.minX, this.maxX, -width / 2 + 50, width / 2 - 50);
      let adjustedY = map(y, this.minY, this.maxY, height / 2 - 50, -height / 2 + 50);
      this.points.push(new Point(id, adjustedX, adjustedY));
    }
  }

  animateOscillation(offsetX = 0, oscillationSpeed = 50) {
    push();
    let oscillation = sin(frameCount * 0.05) * oscillationSpeed;
    translate(offsetX, oscillation, 200);
    this.connectPoints();
    pop();
  }

  animateRotation(x, y, z, rotationAmt, speed, direction = 1, phase = 1 ) {
    push();
    translate(x, y, z);
    rotateX(direction * sin(frameCount * speed) * rotationAmt - (PI / 2* phase));
    this.connectPoints();
    pop();
  }

  connectPoints(numLayers = 1) {
    for (let layer = 0; layer < numLayers; layer++) {
      let alpha = map(layer, 0, numLayers, 50, 150);
      stroke(0, 0, 0, alpha);
      strokeWeight(layer * 0.3);
      fill(this.color[0] * 255, this.color[1] * 255, this.color[2] * 255, this.color[3] * 255 || 255);
      beginShape();
      for (let i = 0; i < this.points.length; i++) {
        let p = this.points[i].position;
        let offsetX = random(-layer * 2, layer * 2);
        let offsetY = random(-layer * 2, layer * 2);
        if (i > 0 && this.points[i].id < this.points[i - 1].id) {
          endShape();
          beginShape();
        }
        vertex(p.x + offsetX, p.y + offsetY, p.z);
      }
      endShape(CLOSE);
    }
  }
}

class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y, 0);
  }
}
