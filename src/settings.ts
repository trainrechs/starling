

export class Settings {
    RenderSettings: RenderSettings
    BoidSettings: BoidSettings;

    constructor() {
        this.RenderSettings = new RenderSettings();
        this.BoidSettings = new BoidSettings();
    }
}

class RenderSettings {
    shouldRenderConnections: boolean;
    shouldRenderVelocities: boolean;

    constructor() {
        this.shouldRenderConnections = false;
        this.shouldRenderVelocities = false;

    }
}

class BoidSettings {
    minSpeed: number;
    maxSpeed: number;
    maxAcceleration: number;
    perceptionRadius: number;
    numBoids: number;

    wallMargin: number;
    wallAvoidanceMultiplier: number;

    cohesionRadius: number;

    cohesionMultiplier: number;
    separationMultiplier: number;
    alignmentMultiplier: number;
    

    constructor() { // TODO: default values
        this.minSpeed = 4;
        this.maxSpeed = 8;
        this.maxAcceleration = .15;
        this.perceptionRadius = 60;
        this.numBoids = 900;
        this.cohesionRadius = 100;
        this.cohesionMultiplier = 1;
        this.separationMultiplier = 1.5;
        this.alignmentMultiplier = 1.2;
        this.wallMargin = 50;
        this.wallAvoidanceMultiplier = 3.0;
    }
}