# ysun0714_9103_GroupF
# Individual submission - Dove of Peace Animation:

## Interaction Instructions
1. **Press the Mouse**: Move the mouse over the screen; Click and hold the mouse to trigger a color and speed transformation:
   - **Dove Color**: Changes from white to deep purple.
   - **Background Color**: Changes from light green to purple reflecting past and future.
   - **Particles**: Change in color,speed and movement reflecting peace and tension.
  
2. **Observe the Animation**: 
The animation begins automatically on page load, with the dove flying peacefully in a gradual Perlin noise pattern. When the mouse is pressed, multiple elements change simultaneously:
- **Dove Movement**: The dove accelerates, flying faster with a color transition.
- **Perlin Noise Effect**: The particles exhibit more dramatic movement, with increased speed and dynamic color shifts.
- **Background Transformation**: The background adjusts color.

Together, these changes create an interactive and cohesive transformation that responds to user input, making the animation feel dynamic and alive.


## Individual Approach to Animation
### Chosen Animation Drivers
For my individual approach, I used **interaction (mouse events)** and **Perlin noise** to drive the animation. The animation intensifies when the mouse is pressed, with increased speed, color transitions, and more dramatic particle movements, creating a heightened sense of motion and engagement.
### Properties Animated
- **Background**: Shifts from light green to purple, adding an atmospheric contrast.
- **Dove**: Changes from white to deep purple, with speed increasing upon interaction.
- **Particles**: Their color and movement shift, with each particle moving faster and becoming more erratic to add tension

### Unique Features
This animation is distinct from my group members' work in several ways:
- **Color Transformation**: The dove and background transition from peaceful colors to deep, intense colors, adding a visual contrast.
- **Speed Variation**: The Perlin noise-driven particles increase in speed, creating a dynamic sense of motion that builds tension and mirrors the dove's shift from slow to fast movement.
- **Representation**: This artwork explores two distinct contrasts: 'past vs. future' and 'peace vs. tension'. The animation begins with a serene, peaceful dove, evoking a sense of calm. When the mouse is pressed, the scene shifts dramatically to a darker, more intense atmosphere, introducing cyberpunk-inspired elements that convey a vision of the future and heightened tension.

## Artistic Inspiration
My individual submission is inspired by one particular piecce of Picasso's _Dove of Peace_ created in 1949 and its thematic representation of peace. I used the original color palette from Picasso’s artwork for the initial Perlin noise particles, then introduced a cyberpunk themed color to create a modernized contrast. My goal is to explores two distinct contrasts: 'past vs. future' and 'peace vs. tension'.

![Dove of Peace by Picasso (1949)](/readmeImages/dove-of-peace1949.jpeg)
<sub>Figure 1. Artistic Inspiration of the initial State of the Animation</sub>

![Artistic Inspiration of Mouse pressed State of the Animation](/readmeImages/cyberpunk.jpg)
<sub>Figure 2. Artistic Inspiration of Mouse pressed State of the Animation</sub>

![Initial state of the animation](/readmeImages/initial-state.png)
<sub>Figure 3. Initial State Of the Animation</sub>

![Mouse Pressed state of the animation](/readmeImages/mouse-pressed.png)
<sub>Figure 4. Mouse Pressed state of the Animation</sub>

## Technical Explanation of My Individual Code

In my individual code, I implemented a **Perlin noise flow field** animation, The animation utilizes **Perlin noise** to control the smooth movement of particles, creating an organic and dynamic background effect.

The majority of my changes were made in the `Scene` class to integrate the Perlin noise flow field and user interaction through mouse events:

1. **Dynamic Noise Field:**  
   I replaced the static gradient background from the group code with a **dynamic Perlin noise flow field**. This flow field uses Perlin noise to determine the direction of each particle's movement, creating a smooth, wave-like animation. The method `move()` in the `Particle` class calculates the angle using Perlin noise and updates the particle’s velocity accordingly.

2. **Mouse Interaction:**  
   I added interactivity using mouse events. When the mouse is pressed:
   - The **noise scale** increases (`updateNoiseScale()`), making the particle movements more dramatic.
   - The **background color** changes from a light cyan to a dark purple, creating a visual contrast.
   - The **particle speed** is increased (`increaseSpeed()`), enhancing the sense of intensity and motion.

3. **Custom Particle System:**  
   The particle system is controlled by the `Particle` class, which:
   - Assigns random colors to each particle based on the current state (default or pressed).
   - Uses `checkEdges()` to reset particles that move outside the canvas bounds.
   - Calls `run()` to manage the particle’s movement and rendering, updating its position based on the Perlin noise angle.

## Tools and Techniques Used

- **Perlin Noise:**  
  I chose Perlin noise because it generates smooth, organic-looking movement patterns, which are ideal for creating natural, flowing animations. 
  
- **Graphics Buffer:**  
  I utilized an **off-screen graphics buffer** (`createGraphics()`) to draw the particles and the background separately. This technique, improves performance and allows for more efficient rendering, especially when dealing with a large number of particles.

## Techniques Referenced from the Internet

- The idea of a **Perlin noise flow field** was inspired by a sketch from inspired by a project from [Ada10086's sketch](https://editor.p5js.org/ada10086/sketches/r1gmVaE07) and a video tutorial by The Coding Train on Perlin noise fields ([The Coding Train, 2020](https://www.youtube.com/watch?v=sZBfLgfsvSk&t=28s)).
These resources provided the foundational technique of using Perlin noise to drive the direction of the particles.
- The use of a **graphics buffer** was adapted from a blog post by Gorilla Sun, which explained how to use `createGraphics()` for off-screen rendering to improve performance and avoid flickering issues.

Incorporating these techniques allowed me to enhance the visual complexity of the animation while maintaining smooth performance.


### External Techniques and References

### References

- Ada10086. (n.d.). *Perlin noise flow field in p5.js*. Retrieved from [https://editor.p5js.org/ada10086/sketches/r1gmVaE07](https://editor.p5js.org/ada10086/sketches/r1gmVaE07)

- Gorilla Sun. (2020). *The p5.js graphics buffer: Off-screen rendering and performance tips*. Retrieved from [https://www.gorillasun.de/blog/the-p5-graphics-buffer/](https://www.gorillasun.de/blog/the-p5-graphics-buffer/)

- The Coding Train. (2020, September 15). *Perlin noise flow field* [Video]. YouTube. Retrieved from [https://www.youtube.com/watch?v=sZBfLgfsvSk&t=28s](https://www.youtube.com/watch?v=sZBfLgfsvSk&t=28s)

- Turner, F. (2010, August). *Processing.js experiment: Noise field*. Airtight Interactive. Retrieved from [https://www.airtightinteractive.com/2010/08/processing-js-experiment-noise-field/](https://www.airtightinteractive.com/2010/08/processing-js-experiment-noise-field/)

- [Cyberpunk-Styled Color Palette inspiration](https://au.pinterest.com/pin/460070918197934836/)

- [Dove of peace by Picasso in 1949](https://www.pablopicasso.org/dove-of-peace.jsp)

[Back to the Top](# Interaction Instructions)