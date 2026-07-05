import GUI from "lil-gui";
import { Simulation } from "./simulation/simulation";
import { Boid } from "./simulation/boid";
import { Vec2 } from "./util/vec2";
import { Settings } from "./settings";
import { Renderer } from "./render";

const settings = new Settings();
const sim = new Simulation(settings, { width: window.innerWidth, height: window.innerHeight });
const renderer = await Renderer.create(window.innerWidth, window.innerHeight);

function addBoid() {
    const angle = Math.random() * Math.PI * 2;
    const speed = settings.BoidSettings.minSpeed +
        Math.random() * (settings.BoidSettings.maxSpeed - settings.BoidSettings.minSpeed);
    const boid = new Boid(
        new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight),
        new Vec2(Math.cos(angle) * speed, Math.sin(angle) * speed)
    );
    sim.boids.push(boid);
    renderer.addBoidGraphic();
}

function removeBoid() {
    sim.boids.pop();
    renderer.removeBoidGraphic();
}

function syncBoidCount(target: number) {
    while (sim.boids.length < target) addBoid();
    while (sim.boids.length > target) removeBoid();
}

for (let i = 0; i < settings.BoidSettings.numBoids; i++) addBoid();

/* ---------------- GUI ---------------- */
const gui = new GUI();

const boidFolder = gui.addFolder("Boid Settings");
boidFolder.add(settings.BoidSettings, "maxSpeed", 0.5, 20, 0.1);
boidFolder.add(settings.BoidSettings, "minSpeed", 0, 20, 0.1);
boidFolder.add(settings.BoidSettings, "maxAcceleration", 0.01, 1, 0.01);
boidFolder.add(settings.BoidSettings, "perceptionRadius", 0, 300, 1);
boidFolder.add(settings.BoidSettings, "cohesionRadius", 0, 300, 1);
boidFolder.add(settings.BoidSettings, "cohesionMultiplier", 0, 5, 0.01);
boidFolder.add(settings.BoidSettings, "separationMultiplier", 0, 5, 0.01);
boidFolder.add(settings.BoidSettings, "alignmentMultiplier", 0, 5, 0.01);
boidFolder.add(settings.BoidSettings, "wallMargin", 0, 300, 1);
boidFolder.add(settings.BoidSettings, "wallAvoidanceMultiplier", 0, 10, 0.1);
boidFolder.add(settings.BoidSettings, "numBoids", 0, 1000, 1)
    .onChange((value: number) => syncBoidCount(value));
boidFolder.open();

const renderFolder = gui.addFolder("Render Settings");
renderFolder.add(settings.RenderSettings, "shouldRenderConnections");
renderFolder.add(settings.RenderSettings, "shouldRenderVelocities");
renderFolder.open();


renderer.app.ticker.add(() => {
    sim.update();
    renderer.render(sim.boids);
});