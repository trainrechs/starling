import type { Settings } from "../settings";
import { Vec2 } from "../util/vec2";
import type { Boid } from "./boid";

/* ---------------- COHESION ---------------- */

export function getCohesionVector(
    boid: Boid,
    neighbors: Boid[],
    settings: Settings
): Vec2 {

    if (neighbors.length === 0) return new Vec2(0, 0);

    let center = new Vec2(0, 0);

    for (const n of neighbors) {
        center = center.add(n.position);
    }

    center = center.divide(neighbors.length);


    const desired = center.subtract(boid.position);

    return desired
        .subtract(boid.velocity)
        .limit(settings.BoidSettings.maxAcceleration);
}

/* ---------------- ALIGNMENT ---------------- */

export function getAlignmentVector(
    boid: Boid,
    neighbors: Boid[],
    settings: Settings
): Vec2 {

    if (neighbors.length === 0) return new Vec2(0, 0);

    let avg = new Vec2(0, 0);

    for (const n of neighbors) {
        avg = avg.add(n.velocity);
    }

    avg = avg.divide(neighbors.length);

    return avg
        .subtract(boid.velocity)
        .limit(settings.BoidSettings.maxAcceleration);
}

/* ---------------- SEPARATION ---------------- */

export function getSeparationVector(
    boid: Boid,
    neighbors: Boid[],
    settings: Settings
): Vec2 {

    let steer = new Vec2(0, 0);

    for (const n of neighbors) {

        const diff = boid.position.subtract(n.position);
        const dist = diff.length();

        if (dist === 0) continue;

        const scaledDiff = diff.scale(1 / dist);
        

        steer = steer.add(scaledDiff)
    }

    return steer
        .subtract(boid.velocity)
        .limit(settings.BoidSettings.maxAcceleration);
}


export function getWallAvoidanceVector(boid: Boid, settings: Settings, bounds: {width: number, height: number}): Vec2 {
    const margin = settings.BoidSettings.wallMargin;
    let steer = new Vec2(0,0);

    // Left edge
    if (boid.position.x < margin) {
        const strength = (margin - boid.position.x) / margin;
        steer = steer.add(new Vec2(strength, 0));
    }
    // Right edge
    if (boid.position.x > bounds.width - margin) {
        const strength = (margin - (bounds.width - boid.position.x)) / margin;
        steer = steer.add(new Vec2(-strength, 0));
    }
    // Top edge
    if (boid.position.y < margin) {
        const strength = (margin - boid.position.y) / margin;
        steer = steer.add(new Vec2(0, strength));
    }
    // Bottom edge
    if (boid.position.y > bounds.height - margin) {
        const strength = (margin - (bounds.height - boid.position.y)) / margin;
        steer = steer.add(new Vec2(0, -strength));
    }

    return steer.limit(settings.BoidSettings.maxAcceleration);

}