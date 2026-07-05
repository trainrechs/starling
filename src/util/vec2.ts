export class Vec2 {
    x: number;
    y: number;

    constructor(xn: number, yn: number) {
        this.x = xn;
        this.y = yn;
    }

    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    scale(s: number): Vec2 {
        return new Vec2(this.x * s, this.y * s);
    }

    divide(s: number) {
        return new Vec2(this.x / s, this.y / s);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vec2 {
        const len = this.length();

        if (len <= 0) {
            return this;
        }
        return new Vec2(this.x / len, this.y / len);
    }

    limit(max: number): Vec2 {
        const len = this.length();
        if (len > max && len > 0) {
            return this.normalize().scale(max);
        }
        return this;
    }

    distanceTo(v: Vec2): number {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    clampSpeed(min: number, max: number): Vec2 {
        const len = this.length();
        if (len === 0) return this; // no direction to preserve, leave as-is
        if (len > max) return this.normalize().scale(max);
        if (len < min) return this.normalize().scale(min);
        return this;
    }
}