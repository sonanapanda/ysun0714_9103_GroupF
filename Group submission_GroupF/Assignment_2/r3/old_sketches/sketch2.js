let sketches = [];

let olive = [0.50,0.7,0.5,1]

function preload() {
  // Initialize sketches with different files and colors
    sketches.push(new File("body.csv", [1, 1, 1, 1]));  // (File,[Colour,Opacity]);
    sketches.push(new File("Rwing.csv", [1, 1, 1, 0.9]));  // 
    sketches.push(new File("Lwing.csv", [1, 1, 1, 0.5]));  // 
    sketches.push(new File("eye.csv", [0.6, 0.6, 0.6, 0.5]));  // 
    sketches.push(new File("branch.csv",olive));
    sketches.push(new File("leaf1.csv",olive));
    sketches.push(new File("leaf2.csv",olive));
    sketches.push(new File("leaf3.csv",olive));
    sketches.push(new File("leaf4.csv",olive));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // Create an off-screen graphics buffer for gradient
  gradientBuffer = createGraphics(width, height);
  drawGradient(gradientBuffer);
  
  // Load points for each sketch
  sketches.forEach(sketch => sketch.loadPoints());
}

function draw() {

  let speed = 0.05;
  // Draw gradient background
  push();
  texture(gradientBuffer);
  plane(width, height);
  pop();

  // Overlay sketches with individual animations
  push();
  let oscillation = sin(frameCount * speed) * 50;
  translate(0, oscillation, 200);
  sketches[0].connectPoints();
  sketches[3].connectPoints();
 
  pop();

  push();
  translate(0, oscillation, 200);
  sketches[4].connectPoints();
  sketches[5].connectPoints();
  sketches[6].connectPoints();
  sketches[7].connectPoints();
  sketches[8].connectPoints();
  pop();


  push();
  translate(80, 50, 200);
  rotateX(sin(frameCount * speed) * PI / 4 - PI / 2);
  sketches[1].connectPoints();
  pop();

  push();
  translate(0, 40, 250);
  rotateX(-sin(frameCount * speed) * PI / 4 + PI / 2);
  sketches[2].connectPoints();
  pop();
}

// File function to load table and create Sketch instance
function File(filename, color) {
  let table = loadTable("assets/" + filename, "csv", "header");
  return new Sketch(table, color);
}

function drawGradient(pg) {
  pg.noFill();
  let c1 = color(255);
  let c2 = color(100, 160, 255);

  for (let y = 0; y < pg.height; y++) {
    let inter = map(y, 0, pg.height, 0, 1);
    pg.stroke(lerpColor(c1, c2, inter));
    pg.line(0, y, pg.width, y);
  }
}

// Point and Sketch classes remain the same
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