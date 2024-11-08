var num = 2000;
var noiseScale = 500, noiseStrength = 1;
var particles = [];

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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Create a semi-transparent rectangle overlay for fading trails
  push();
  fill(0, 30); // Adjust alpha for fading effect
  rectMode(CENTER);
  rect(0, 0, width * 2, height * 2); // Large rectangle covering canvas
  pop();

  // Draw the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }

  // Overlay a simple shape
  drawOverlayShape();
}

function drawOverlayShape() {
  fill(255, 0, 0); // Red color
  push(); // Save the current state
  translate(0, 0, 10); // Move forward slightly on the z-axis to place it in front of particles
  rectMode(CENTER); // Center the rectangle
  rect(0, 0, 200, 100); // A larger rectangle in the center
  pop(); // Restore the previous state
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
