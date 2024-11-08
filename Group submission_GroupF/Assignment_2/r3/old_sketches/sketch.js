let sketches = []; // Array to store each sketch dynamically
let gradientBuffer;

function preload() {
  // Load all CSV files in assets folder
  let files = ['body.csv', 'Rwing.csv', 'Lwing.csv', 'eye.csv']; // List all CSV filenames here
  for (let i = 0; i < files.length; i++) {
    let table = loadTable('assets/' + files[i], 'csv', 'header');
    sketches.push(new Sketch(table, [1, 1, 1, 1])); // Assign white color to each sketch; modify colors as needed
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Create an off-screen graphics buffer
  gradientBuffer = createGraphics(width, height);
  drawGradient(gradientBuffer);

  // Load points for each sketch
  for (let sketch of sketches) {
    sketch.loadPoints();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Draw gradient background
  push();
  texture(gradientBuffer);
  plane(width, height);
  pop();

  // Access and animate each sketch individually
  push();
  let oscillation = sin(frameCount * 0.05) * 50;
  translate(0, oscillation, 200);
  sketches[0].connectPoints(); // First sketch with oscillation
  sketches[3].connectPoints(); // Fourth sketch with scaling
  pop();

  push();
  translate(80, 50, 200);
  rotateX(sin(frameCount * 0.05) * PI / 4 - PI / 2);
  sketches[1].connectPoints(); // Second sketch with rotation
  pop();

  push();
  translate(0, 40, 250);
  rotateX(-sin(frameCount * 0.05) * PI / 4 + PI / 2);
  sketches[2].connectPoints(); // Third sketch with opposite rotation
  pop();


}

function drawGradient(pg) {
  pg.noFill();
  let c1 = color(255);       // Top color
  let c2 = color(100, 160, 255); // Bottom color

  for (let y = 0; y < pg.height; y++) {
    let inter = map(y, 0, pg.height, 0, 1);
    pg.stroke(lerpColor(c1, c2, inter));
    pg.line(0, y, pg.width, y);
  }
}

class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y, 0);
  }
}

class Sketch {
  constructor(table, color) {
    this.table = table;
    this.points = [];
    this.color = color;
    this.minX = 0;
    this.maxX = 200;
    this.minY = 0;
    this.maxY = 200;
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

  connectPoints(numLayers = 1) {
    for (let layer = 0; layer < numLayers; layer++) {
      let alpha = map(layer, 0, numLayers, 50, 150);
      stroke(0, 0, 0, alpha);
      strokeWeight(0 + layer * 0.3);

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
