// Scene class to handle background drawing
class Scene {
  // Constructor to initialise background scene with width and height
  constructor(w, h) {
      
    // https://www.gorillasun.de/blog/the-p5-graphics-buffer/
    //Create an off-screen graphics buffer for drawing, to improve the speed (it was causing rendering issues before)
      this.buffer = createGraphics(w, h);

      this.drawGradient(); // Draw the initial gradient on the buffer
  }

  // Method to draw a gradient on the buffer
  drawGradient() {
      // Initialize the colors for the gradient to interpolate between
      let c1 = color(255); // Start colour (white) with p5 color func
      let c2 = color(100, 160, 255); // End colour (light blue)

      this.buffer.noFill(); // Ensure buffer background has no fill

      // Loop through each pixel in the height (y-axis) of the buffer to create the gradient
      for (let y = 0; y < this.buffer.height; y++) {
          // Calculate the interpolation factor based on the current y position
          let interp = map(y, 0, this.buffer.height, 0, 1);
          // Set the stroke color based on the interpolation between c1 and c2
          this.buffer.stroke(lerpColor(c1, c2, interp));
          // Draw a line across the width of the buffer at the current y position
          this.buffer.line(0, y, this.buffer.width, y);
      }
  }

  // Method to display the background on the main canvas
  displayBackground() {
      push(); // Save the current drawing state
      texture(this.buffer); // Use the graphics buffer as a texture (https://www.gorillasun.de/blog/the-p5-graphics-buffer/#buffer-as-a-texture)
      plane(width, height); // Draw a plane that covers the entire canvas with the texture
      pop(); // Restore the previous drawing state
  }
}
