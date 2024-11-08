// this script includes some perlin noise flow field stuff, inspired from this:
//https://editor.p5js.org/ada10086/sketches/r1gmVaE07

//it was done as a proof of concept to show tha it's possilbt to use perlin noise with the overlayed sketches and 3D webGL stuff

let table1, table2, table3;
let sketch1, sketch2, sketch3;

let num = 200;
var noiseScale = 500, noiseStrength = 1;

var particles = [];

function preload() {
  // Load CSV tables
  table1 = loadTable('assets/body.csv', 'csv', 'header');
  table2 = loadTable('assets/Rwing.csv', 'csv', 'header');
  table3 = loadTable('assets/Lwing.csv', 'csv', 'header');
}

function setup() {


  createCanvas(windowWidth, windowHeight, WEBGL); // Use WebGL
  noStroke();

  for (let i = 0; i < num; i++) {
    // Create particles with random locations in the 2D plane
    var loc = createVector(random(width) - width / 2, random(height) - height / 2, 0); // Set z to 0 for 2D plane
    var angle = 0; // any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5, 2);
    particles[i] = new Particle(loc, dir, speed);
  }

  // Initialize sketches with specific colors
  sketch1 = new Sketch(table1, [1, 1, 1,1]); // Black color
  sketch2 = new Sketch(table2, [1.0, 1.0, 1.0, 0.5]); // Green color
  sketch3 = new Sketch(table3, [0.0, 0.0, 1.0,0.1]); // Blue color

  sketch1.loadPoints();
  sketch2.loadPoints();
  sketch3.loadPoints();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Create a semi-transparent rectangle overlay for fading trails
  push();
  fill(0,190,255, 35); // Adjust alpha for fading effect
  rectMode(CENTER);
  rect(0, 0, width * 2, height * 2); // Large rectangle covering canvas
  pop();

  // Draw the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
//   Overlay sketches
  push();
  let oscillation = sin(frameCount * 0.05) * 50; // Adjust the multiplier for oscillation range
  translate(0, oscillation, 200); // Only translate vertically and place it in front
  sketch1.connectPoints();
  pop();

   // Animate sketch2 with rotation
  push();
  translate(80, 50, 200); // Adjust the z position to ensure visibility
  rotateX(sin(frameCount * 0.05) * PI / 4 - PI / 2); // Rotate along the X-axis over time
  sketch2.connectPoints();
  pop();

  // Animate sketch3 with opposite rotation
  push();
  translate(0, 40, 250); // Adjust the z position to ensure visibility
  rotateX(-sin(frameCount * 0.05) * PI / 4 + PI / 2); // Opposite rotation along the X-axis
  sketch3.connectPoints();
  pop();
}

class Particle {
    constructor(_loc, _dir, _speed) {
      this.loc = _loc;
      this.dir = _dir;
      this.speed = _speed;
    }
  
    run() {
      this.move();
      this.checkEdges();
      this.update();
    }
  
    move() {
      let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength; // 0-2PI
      this.dir.x = cos(angle);
      this.dir.y = sin(angle);
      var vel = this.dir.copy();
      var d = 1; // direction change 
      vel.mult(this.speed * d); // vel = vel * (speed*d)
      this.loc.add(vel); // loc = loc + vel
    }
  
    checkEdges() {
      // If particles move out of the 2D canvas area, reset their position
      if (this.loc.x < -width / 2 || this.loc.x > width / 2 || this.loc.y < -height / 2 || this.loc.y > height / 2) {
        this.loc.x = random(width) - width / 2;
        this.loc.y = random(height) - height / 2;
        this.loc.z = 0; // Keep z fixed at 0
      }
    }
  
    update() {
      fill(255);
      ellipse(this.loc.x, this.loc.y, 5); // Make the ellipse smaller for better visibility
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
    for (let layer = 0; layer < numLayers; layer++) {
      let alpha = map(layer, 0, numLayers, 50, 150);
      stroke(0, 0, 0, alpha);
      strokeWeight(0 + layer * 0.3);
  
      // Set fill color based on this.color
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
      endShape(CLOSE); // Close the shape
    }
  }
} 

