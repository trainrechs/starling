import type { Settings } from "../settings";
import { Boid } from "./boid";
import {
    getSeparationVector,
    getCohesionVector,
    getAlignmentVector,
    getWallAvoidanceVector
} from "./behaviors";

export class Simulation {
    boids: Boid[];
    settings: Settings;
    bounds: { width: number; height: number };

    constructor(settings: Settings, windowBounds: { width: number; height: number }) {
        this.settings = settings;
        this.boids = [];
        this.bounds = windowBounds;

    }

    update() {

        for (const boid of this.boids) {

            const neighbors = this.getNeighbors(boid);

            const separation = getSeparationVector(boid, neighbors, this.settings)
                .scale(this.settings.BoidSettings.separationMultiplier);

            const cohesion = getCohesionVector(boid, neighbors, this.settings)
                .scale(this.settings.BoidSettings.cohesionMultiplier);

            const alignment = getAlignmentVector(boid, neighbors, this.settings)
                .scale(this.settings.BoidSettings.alignmentMultiplier);

            const wallAvoidance = getWallAvoidanceVector(boid, this.settings, this.bounds).scale(this.settings.BoidSettings.wallAvoidanceMultiplier)
            //let separation = new Vec2(0,0);
            //let alignment = new Vec2(0,0);

            boid.acceleration = boid.acceleration.add(separation).add(cohesion).add(alignment).add(wallAvoidance).limit(this.settings.BoidSettings.maxAcceleration);
            
            console.log(boid.acceleration.x)
            boid.velocity = boid.velocity
                .add(boid.acceleration)
                .clampSpeed(this.settings.BoidSettings.minSpeed, this.settings.BoidSettings.maxSpeed)

            boid.position = boid.position.add(boid.velocity)

            boid.acceleration = boid.acceleration.scale(0);
        }
    }

    getNeighbors(boid: Boid): Boid[] {

        const result: Boid[] = [];

        for (const other of this.boids) {
            if (other === boid) continue;

            if (boid.position.distanceTo(other.position) <
                this.settings.BoidSettings.perceptionRadius) {
                result.push(other);
            }
        }

        return result;
    }
}