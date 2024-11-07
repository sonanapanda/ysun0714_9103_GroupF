# ysun0714_9103_GroupF
# Individual submission - Dove of Peace Animation:

## Interaction Instructions
1. **Press the Mouse**: Move the mouse over the screen; Click and hold the mouse to trigger a color and speed transformation:
   - **Dove Color**: Changes from white to deep purple.
   - **Background Color**: Changes from light green to purple.
   - **Particles**: Change in color,speed and movement to reflect peace and tension.
2. **Observe the Animation**: Animation begins automatically on page load, with the dove flying in a gradual Perlin noise pattern. When the mouse is pressed, multiple elements change simultaneously: the Perlin noise influence intensifies, colors shift, speed increases, and the background adjusts, adding contrast and creating a dynamic visual transformation.

## Individual Approach to Animation
### Chosen Animation Drivers
For my individual approach, I used **interaction (mouse events)** and **Perlin noise** to drive the animation. The animation intensifies when the mouse is pressed, adding speed, color changes, and increased particle movement.
### Properties Animated
- **Background**: Shifts from light green to purple, adding an atmospheric contrast.
- **Dove**: Changes from white to deep purple, with speed increasing upon interaction.
- **Particles**: Their color and movement shift, with each particle moving faster and becoming more erratic to add tension

### Unique Features
This animation is distinct from my group members' work in several ways:
- **Color Transformation**: The dove and background transition from peaceful colors to deep, intense colors, adding a visual contrast.
- **Speed Variation**: The Perlin noise-driven particles increase in speed, creating a dynamic sense of motion that builds tension and mirrors the dove's shift from slow to fast movement.
- **Representation**: This artwork explores the contrast between peace and tension, past and future. Initially, the animation reflects the peaceful elegance of Picasso's work. When the mouse is pressed, the dove’s speed intensify, while dark, cyberpunk-themed colors emerge, representing a modern, futuristic vision. 

## Artistic Inspiration
My individual submission is inspired by Picasso's Dove of Peace (1949) and its thematic representation of peace. I used the original color palette from Picasso’s artwork for the initial Perlin noise particles, then introduced a cyberpunk style to create a modernized contrast. My goal is to evoke both peace and tension, reflecting the duality of past and future.

![Dove of Peace by Picasso (1949)](/readmeImages/dove-of-peace1949.jpeg)
<sub>Figure 1. Artistic Inspiration of the initial State of the Animation</sub>
![Dove of Peace by Picasso (1949)](/readmeImages/cyberpunk.jpeg)
<sub>Figure 2. Artistic Inspiration of Mouse pressed State of the Animation</sub>
![Initial state of the animation](/readmeImages/initial-state.png)
<sub>Figure 3. Initial State Of the Animation</sub>
![Mouse Pressed state of the animation](/readmeImages/mouse-pressed.png)
<sub>Figure 4. Mouse Pressed state of the Animation</sub>

## Technical Explanation
### Perlin Noise and Interaction-Driven Animation
The animation combines **Perlin noise** with mouse interaction to create a responsive environment:
- **Perlin Noise**: The particles’ smooth and varied movement pattern is driven by Perlin noise, which I implemented with inspiration and techniques learned from this p5.js sketch and YouTube tutorial(See reference). The particles' directions are influenced by noise values that dynamically adjust when the mouse is pressed, with a reduced noiseScale increasing movement randomness and adding tension.
- **Mouse Interaction**: The `mouseIsPressed` flag is used to:
  - Transition the background and dove colors.
  - Increase the dove’s speed and make particles move faster.
  - Set particle colors to match a cyberpunk-themed color palette.

### Code Changes from Group Code
- **Mouse Interaction**: The `mouseIsPressed` flag is used to:
  - Transition the background color from light green to purple.
  - Change the dove color from white to deep purple.
  - Increase particle speed and adjust `noiseScale` for more dynamic motion.

- **Dynamic Particle Background**: Replaces the static gradient with animated, Perlin noise-driven particles:
  - Particles move smoothly with noise, adding depth and interactivity to the scene.

- **Perlin Noise Adjustment**: The `move()` function uses a dynamic `noiseScale` that:
  - Gradually increases from 200 to 500 on mouse press, intensifying particle movement.

- **Color Changes**: Colors change when the mouse is pressed:
  - Particles to shift from *Dove of Peace*-inspired tones to intense cyberpunk colors on mouse press.

- **Speed Adjustment**: Particles increase their speed on mouse press:
  - Speed returns to normal upon release.

- **Particle Trails**: Added low-opacity fill to create fading trails:
  - Trails give particles a smoother motion.

- **Dynamic Particle Addition**: Supports adding particles based on interaction:
  - Increases density for a more engaging and customizable experience.

### External Techniques and References
Cyberpunk Color Palette: Inspired by cyberpunk visuals to emphasize 
Picasso Peace of Dove
Perlin Noise inspiration: 
[P5 JS code inspiration for Perlin Noise Flow](https://editor.p5js.org/ada10086/sketches/r1gmVaE07) 
[Youtube tutorial for Perlin Noise Flow Fields](https://youtu.be/sZBfLgfsvSk?si=9ks3GtielXW9C6UO)
