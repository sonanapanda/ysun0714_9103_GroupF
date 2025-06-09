let sketches = []; // Array to hold all sketch instances
let green = [128, 179, 128, 255]; // RGBA colour array for green
let white = [255, 255, 255, 255]; // RGBA colour array for white
let scene; // Variable to hold the Scene object
let mouseIsPressedFlag = false; // Flag to track mouse press for wing/body speed adjustment

// Define fixed aspect ratio and canvas dimensions
let aspectRatio = 1 / 1; // Fixed aspect ratio
let minWidth = 600;   // Minimum width for the canvas
let minHeight = 600;  // Minimum height for the canvas
let maxWidth = 900;  // Maximum width for the canvas
let maxHeight = 900;  // Maximum height for the canvas
let doveTexture;
// Preload function to load sketch data
function preload() {
   // Create new Sketch instances from CSV files and assign colours
  sketches.push(new Sketch("body.csv", white));
  sketches.push(new Sketch("Rwing.csv", white));
  sketches.push(new Sketch("Lwing.csv", [255, 255, 255, 200]));
  sketches.push(new Sketch("eye.csv", [60, 60, 60, 100]));
  sketches.push(new Sketch("branch.csv", green));
  sketches.push(new Sketch("leaf1.csv", green));
  sketches.push(new Sketch("leaf2.csv", green));
  sketches.push(new Sketch("leaf3.csv", green));
  sketches.push(new Sketch("leaf4.csv", green));
}

// Setup function to initialize the canvas and scene
function setup() {
  createCanvas(600, 600, WEBGL); // Create a 600x600 WebGL canvas
  canvas.parent('sketch-holder');
   
  noStroke(); // Disable stroke drawing
  let numParticles = int(random(100, 1000));
  scene = new Scene(600, 600, numParticles); // Initialize Scene with random particle density

  // Load all sketch points for each sketch
  sketches.forEach(sketch => sketch.loadPoints());
}

// Draw function that runs continuously to render the scene
function draw() {
  scene.displayBackground(); // Display the background gradient

  let x_offset = 0; // X-axis offset for animation
  let y_offset = 40; // Y-axis offset for animation
  let z_offset = 200; // Z-axis offset for animation

  // Define base speed values for oscillation and rotation
  let oscillationSpeed = mouseIsPressedFlag ? 0.2 : 0.05; // Faster speed if mouse is pressed
  let rotationSpeed = mouseIsPressedFlag ? 0.2 : 0.05; // Faster rotation if mouse is pressed

  // Animate oscillation for the dove body and other sketches with the same offsets
  sketches[0].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed); // Body oscillation (sketches[0])
  sketches[3].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);
  sketches[4].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);
  sketches[5].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);
  sketches[6].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);
  sketches[7].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);
  sketches[8].animateOscillation(x_offset, y_offset, z_offset, oscillationSpeed);

  // Animate rotation for wings with increased speed if mouse is pressed
  sketches[1].animateRotation(50, 0, z_offset, PI / 4, rotationSpeed); // Rotate right wing
  sketches[2].animateRotation(0, 0, z_offset, PI / 4, rotationSpeed, -1, -1); // Rotate left wing
}

// Adjust speed of wing/body on mouse press and release
function mousePressed() {
  mouseIsPressedFlag = true; // Activate speed increase for wings/body
  scene.particles.forEach(particle => particle.increaseSpeed()); // Increase particle speed
}

function mouseReleased() {
  mouseIsPressedFlag = false; // Deactivate speed increase for wings/body
  scene.particles.forEach(particle => particle.resetSpeed()); // Reset particle speed
}

// Function to handle window resizing events
function windowResized() {
    // Calculate new dimensions based on aspect ratio
  let newWidth = windowWidth;// Get new window width
  let newHeight = newWidth / aspectRatio;// Calculate new height based on aspect ratio
// Ensure that the new dimensions respect the aspect ratio and defined limits
  if (newHeight > maxHeight) { // Limit to max height
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  } else if (newWidth < minWidth) { 
    newWidth = minWidth; // Limit to min width
    newHeight = newWidth / aspectRatio; // Adjust height to maintain aspect ratio
  }

  resizeCanvas(newWidth, newHeight); // Resize the canvas to new dimensions
  scene = new Scene(newWidth, newHeight); // Create a new scene with updated dimensions
  sketches.forEach(sketch => sketch.loadPoints()); // Reload points for all sketches
}
