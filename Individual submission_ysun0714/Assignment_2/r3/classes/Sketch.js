class Sketch {
  constructor(filename, colour) {
    // Load the CSV file containing point the data
    this.table = loadTable("assets/" + filename, "csv", "header");
    this.colour = colour;  //store the colour of the sketch
    this.points = []; //initialise array for points
    
    this.minX = 0;    // define coords for the limits of the sketch points, these are the min/max values so the sketch can be normalised and centred
    this.maxX = 200;
    this.minY = 0;
    this.maxY = 200; 
    this.scaleFactor = 0.7; // Adjust this scale factor as needed, this affects the positioning of wings etc which is why it is kept inside the sketch class
  }

  loadPoints() {
    // this method loads the points from the this.table, normalises, centres, and pushes the adjusted coordinates to the array "points"
    this.points = []; // ensure points array is empty to begin with

    for (let i = 0; i < this.table.getRowCount(); i++) {
      // for each of rows in the table, pull the first three columns (ignore z column of the data, as they are 2d x,y sketches of points)

      let row = this.table.getRow(i);  // getRow allows you to cycle through the rows in the table with the row number
      let id = row.getNum('Point #'); // retrieve float value like this example https://p5js.org/reference/p5.TableRow/getNum/
      let x = row.getNum('X');
      let y = row.getNum('Y');

      // Adjust coordinates using a scale factor, using p5 map function it can be moved within the relevant bounds, centre being width/2 & height/2, and a scale factor can zoom the sketches in and out. This however doesnt account for rotation of the wings so needs to be adjusted depending on the scale factor.
      let adjustedX = map(x, this.minX, this.maxX, -width / 2 + 100, width / 2 - 100) * this.scaleFactor;
      let adjustedY = map(y, this.minY, this.maxY, height / 2 - 100, -height / 2 + 100) * this.scaleFactor;

      // push the adjusted points to the array this.points including the id and a position vector of the x,y point of each row
      this.points.push({ id: id, position: createVector(adjustedX, adjustedY) });
    }
  }

  connectPoints() {
    // Set color based on whether the mouse is pressed
    if (mouseIsPressedFlag) {
        // Change body color to dark purple if it's not the eye
        fill(20, 11, 3, this.colour[3]); // Dark purple for body
    } else {
        // Use the original color for all parts, including the eyes
        fill(this.colour[0], this.colour[1], this.colour[2], this.colour[3]);
    }

    // Draw the shape with the specified color
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
        let p = this.points[i].position;
        vertex(p.x, p.y);
    }
    endShape(CLOSE);
}


  animateRotation(x, y, z, rotationAmt, speed, direction = 1, phase = 1) {
    // used to rotate the wings in the sketch, this requires WEBGL!!!
    push(); // save the current drawing state
    translate(x, y, z); // firstly adjust the shapes so that rotation ends up in front of the background canvas

    rotateX(direction * sin(frameCount * speed) * rotationAmt - (PI / 2 * phase));
    this.connectPoints(); // draw this new state
    pop(); // restoring previous drawing state without affecting other functions etc
  }
  
  animateOscillation(offsetx, offsety, offsetZ, oscillationSpeed, oscil_amount = 20) {
    // the body needed to move with the wings, however up and down, not rotation. 
    // repeating the same idea as above, except only translating.
    push();
    let oscillation = sin(frameCount * oscillationSpeed) * (oscil_amount * this.scaleFactor) - offsety;
    translate(offsetx, oscillation, offsetZ); // using the oscillation within translation allowed for the up/down movement
    this.connectPoints();
    pop();
  }
}
