![simulation](https://github.com/trainrechs/starling/blob/main/assets/simulation.gif)

# starling 🐦

A real-time boids flocking simulation built with TypeScript, [PixiJS](https://pixijs.com/), and [lil-gui](https://lil-gui.georgealways.com/) — implementing an elementary flocking algorithm based on a [1987 paper by Craig Reynolds](https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/).
 
**[Live demo →](https://trainrechs.github.io/starling/)**
 
## How it works
 
Each frame, every boid looks at its neighbors within a perception radius and computes three steering vectors:
 
- **Cohesion** — steer toward the average position of nearby boids.
- **Alignment** — steer toward the average heading of nearby boids.
- **Separation** — steer away from boids that are too close.

An additional force, wall avoidance, pushes boids back towards the center of the screen as they approach the edges. 

These are weighted, summed, and clamped to a maximum acceleration, then applied to the boid's velocity and position. See `settings.ts` for the full list of tunable parameters.

## Building Yourself
 
```bash
# install dependencies
npm install
 
# start a local dev server with hot reload
npm run dev
 
# build for production
npm run build
 
# preview the production build locally
npm run preview
```
 
## Project structure
 
```
src/
├── main.ts                  # entry point, lil-gui settings editor
├── render.ts                # PixiJS rendering: boid graphics, 
├── settings.ts              # all tunable simulation and render parameters
├── simulation/
│   ├── boid.ts               
│   ├── behaviors.ts          # cohesion, alignment, separation, wall avoidance logic
│   └── simulation.ts         # per-frame update loop and neighbor queries
└── util/
    └── vec2.ts                # vector math utility
    └── colors.ts                # color palettes for boids and background
```
 

 

