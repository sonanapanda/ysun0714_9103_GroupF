let table1, table2, table3;
let sketch1, sketch2, sketch3;
let rotationSpeed = 0.06;
let backgroundLayer;
let texcoordShader;

function preload() {
  // Load the shader
  texcoordShader = loadShader('texcoord.vert', 'texcoord.frag');

  // Load CSV tables
  table1 = loadTable('assets/body.csv', 'csv', 'header');
  table2 = loadTable('assets/Rwing.csv', 'csv', 'header');
  table3 = loadTable('assets/Lwing.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  backgroundLayer = new BackgroundLayer('texcoord.vert', 'texcoord.frag');
  backgroundLayer.setup();

  // Initialize sketches with specific colors
  sketch1 = new Sketch(table1, [0.0, 0.0, 0.0,1.0]); // Red color
  sketch2 = new Sketch(table2, [0.0, 1.0, 0.0]); // Green color
  sketch3 = new Sketch(table3, [0.0, 0.0, 1.0]); // Blue color

  sketch1.loadPoints();
  sketch2.loadPoints();
  sketch3.loadPoints();
}


function draw() {
  
  
  push();
    let oscillation = sin(frameCount * rotationSpeed) * 50; // Adjust the multiplier for oscillation range
  translate(0, oscillation); // Only translate vertically
  sketch1.connectPoints();
  resetShader();
  pop();

  // Oscillating sketch2
  push();
  translate(80, 50);
  rotateX(sin(frameCount * rotationSpeed) * PI / 4 - PI / 2);
  sketch2.connectPoints();
  // texcoordShader.setUniform('uColor', this.color);
  pop();

  // Opposite oscillating sketch3
  push();
  translate(0, 40);
  rotateX(-sin(frameCount * rotationSpeed) * PI / 4 + PI / 2);
  sketch3.connectPoints();
  pop();

  // // Draw the background layer
  backgroundLayer.draw();
  // // Reset shader to default before drawing sketches
  resetShader();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundLayer.resize();
}

// BackgroundLayer class definition
class BackgroundLayer {
  constructor(vertexShader, fragmentShader) {
      this.vertexShader = vertexShader;
      this.fragmentShader = fragmentShader;
      this.shaderProgram = null;
  }

  setup() {
      // Load the shader in setup
      this.shaderProgram = loadShader(this.vertexShader, this.fragmentShader);
  }

  draw() {
      // Set the active shader and draw the rectangle
      shader(this.shaderProgram);
      rect(-width / 2, -height / 2, width, height); // Draw a rectangle covering the canvas, centered
  }
}

// Point class to represent individual 3D points
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
    // Set the color uniform for each sketch before drawing
    // texcoordShader.setUniform('uColor', this.color);

    for (let layer = 0; layer < numLayers; layer++) {
      let alpha = map(layer, 0, numLayers, 50, 150);
      stroke(0, 0, 0, alpha);
      strokeWeight(0 + layer * 0.3);

      beginShape();
      // texcoordShader.setUniform('uColor', this.color);
      for (let i = 0; i < this.points.length; i++) {
        let p = this.points[i].position;

        // texcoordShader.setUniform('uTexCoord', [(p.x + width / 2) / width, (p.y + height / 2) / height]);

        let offsetX = random(-layer * 2, layer * 2);
        let offsetY = random(-layer * 2, layer * 2);

        if (i > 0 && this.points[i].id < this.points[i - 1].id) {
          endShape();
          beginShape();
        }

        vertex(p.x + offsetX, p.y + offsetY, p.z);
      }
      endShape();
    }
  }
}
