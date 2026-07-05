import { Vec2 } from "../util/vec2";

export class Boid {
    position: Vec2;
    velocity: Vec2;
    acceleration: Vec2;

    constructor(position: Vec2, velocity: Vec2) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vec2(0, 0);
    }
}