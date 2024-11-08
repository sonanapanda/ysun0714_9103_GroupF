// The Perlin noise flow field, inspired by:
// https://editor.p5js.org/ada10086/sketches/r1gmVaE07
// https://www.youtube.com/watch?v=sZBfLgfsvSk&t=28s

// It was created as a proof of concept to demonstrate the use of Perlin noise with overlayed sketches and 3D WebGL.

// Particle class to handle individual particle behavior
// The Particle class will be defined first since it is used by the Scene class.
class Particle {
  // Constructor to initialize particle properties
  constructor(loc, dir, speed, noiseStrength) {
    this.loc = loc; // Particle location vector
    this.dir = dir; // Particle direction vector
    this.speed = speed; // Particle speed
    this.noiseStrength = noiseStrength; // Strength of noise influence
    this.defaultSpeed = speed; // Default speed for resetting

    // Assign random colors for the particles for default and pressed states
    this.defaultColor = this.randomColor("default");
    this.pressedColor = this.randomColor("pressed");
  }
  // the randomColor() method is used to randomly select a color from a 
  // predefined list of colors based on the particle's state
  randomColor(state) {
    const defaultColors = [
      color(255, 69, 0),    // Red-Orange
      color(255, 165, 0),   // Orange
      color(255, 215, 0),   // Gold
      color(0, 191, 255),   // Deep Sky Blue
      color(7, 146, 94),    // Teal Green
    ];
    
    const pressedColors = [
      color(252, 186, 253), // Light Pink
      color(247, 133, 249), // Bright Pink
      color(193, 65, 227),  // Purple
      color(111, 218, 251), // Sky Blue
      color(31, 34, 99),    // Navy Blue
    ];
    
    // Return a random color based on the state
    return random(state === "pressed" ? pressedColors : defaultColors);
  }

  // run() is the main control method for each particle and 
  //is called repeatedly in the animation loop. 
  //It controls the behavior of a particle in three main steps:
  run(buffer, noiseScale) {
    this.move(noiseScale); // Update the particle's movement based on Perlin noise
    this.checkEdges(buffer.width, buffer.height); // Check if the particle has left the canvas and reset its position if needed
    this.update(buffer); // Render the particle on the buffer
  }

  // Method to move the particle using Perlin noise for smooth directional changes
  move(noiseScale) {
    // Calculate noise angle based on particle's position and noise scale
    let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * this.noiseStrength;
    //these functions determine which way the particle should move.
    this.dir.x = cos(angle); // Update direction x 
    this.dir.y = sin(angle); // Update direction y 

    // Calculate velocity vector and update particle's position
    // this.dir.copy() creates a copy of the direction vector. 
    //This is important because it prevents changes to this.dir when we modify the velocity vector.
    //.mult(this.speed) scales (multiplies) the direction vector by this.speed.
    //This step creates the velocity vector, which has both:
    //Direction (from this.dir) and Speed (from this.speed).
    let vel = this.dir.copy().mult(this.speed);
    this.loc.add(vel); //The .add(vel) method updates the particle’s position (this.loc) by adding the velocity vector (vel) to it.
    //This means the particle’s position changes according to its current direction and speed.
  }

  // Method to check if the particle is outside canvas bounds
  checkEdges(w, h) {
    if (this.loc.x < 0 || this.loc.x > w || this.loc.y < 0 || this.loc.y > h) {
      // Reset position to a random location within the canvas
      this.loc.x = random(w);
      this.loc.y = random(h);
      this.loc.z = 0; // Reset z-axis value for 3D
    }
  }

  // Method to draw the particle on the buffer
  update(buffer) {
    //as mouse pressed, the particle change color (from defaultColor to pressedColor)
    let currentColor = mouseIsPressed ? this.pressedColor : this.defaultColor;
    buffer.fill(currentColor); // Set the fill color for the particle
    buffer.noStroke(); 
    buffer.ellipse(this.loc.x, this.loc.y, 5); // Draw the particle as a small ellipse
  }
  // As mouse pressed, the particle will increase in speed
  // this is the Method to increase particle speed on mouse press
  increaseSpeed() {
    this.speed = this.defaultSpeed * 3; // Triple the speed when the mouse is pressed
  }

  // Method to reset speed when the mouse is released
  resetSpeed() {
    this.speed = this.defaultSpeed;
  }
}

// Scene class to handle the background drawing
class Scene {
  // Constructor to initialize the background scene with width and height
  constructor(w, h) {
    // Create an off-screen graphics buffer for improved performance
    this.buffer = createGraphics(w, h); // Off-screen buffer for background
    this.numParticles = 1000; // Fixed number of particles for the background
    this.noiseScale = 800; // Set the maximum noise scale
    this.dynamicNoiseScale = 200; // Initial noise scale (changes with mouse press)
    this.noiseStrength = 1; // Strength of the noise effect
    this.particles = []; // Array to hold all particles

    // Define default and pressed background colors
    this.defaultbackgroundColor = color(200, 230, 225, 70); // Light blueish color with 70% opacity
    this.pressedbackgroundColor = color(115, 40, 255, 50); // Purple color with 50% opacity

    // Initialize particles using Perlin noise settings across the entire canvas
    for (let i = 0; i < this.numParticles; i++) {
      this.addParticle(w, h); // Add each particle to the array
    }
  }

  // Method to add a single particle to the scene
  addParticle(w, h) {
    let loc = createVector(random(w), random(h), 0); // Make the starting position random within the canvas
    let angle = random(TWO_PI); // Make the initial direction random
    let dir = createVector(cos(angle), sin(angle)); // Make the direction of vector based on angle
    let speed = random(0.5, 2); // Random speed for variation
    this.particles.push(new Particle(loc, dir, speed, this.noiseStrength)); // Add the particle to the array
  }
  // As mouse pressed, the particle will move more dramatically
  // Method to update noise scale based on mouse press
  updateNoiseScale() {
    if (mouseIsPressed) {
      this.dynamicNoiseScale = min(this.dynamicNoiseScale + 5, 500); // Increase noise scale when the mouse is pressed, up to a maximum of 500
    } else {
      this.dynamicNoiseScale = 200; // Reset noise scale to 200 when the mouse is not pressed
    }
  }

  // Method to display the background particles using Perlin noise
  displayBackground() {
    // Another mousePressed effect: as mouse is pressed, background changes color 
    //from bright cyan to dark purple
    this.updateNoiseScale(); // Update the noise scale based on mouse press status
    let backgroundColor = mouseIsPressed ? this.pressedbackgroundColor : this.defaultbackgroundColor; // Choose background color based on mouse press

    // Clear the buffer with the chosen background color to create fading trails
    this.buffer.fill(backgroundColor);
    this.buffer.noStroke();
    this.buffer.rect(0, 0, this.buffer.width, this.buffer.height);

    // Update and display each particle using the dynamic noise scale
    for (let particle of this.particles) {
      particle.run(this.buffer, this.dynamicNoiseScale);
    }

    // Display the buffer on the main canvas, aligned to the top-left corner
    push();
    translate(-width / 2, -height / 2);
    image(this.buffer, 0, 0);
    pop();
  }
}
