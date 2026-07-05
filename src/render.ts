import * as PIXI from "pixi.js";
import type { Boid } from "./simulation/boid";
import { BACKGROUND_COLOR, BOID_PALETTE } from "./util/colors";


export class Renderer {
    app: PIXI.Application;
    graphics: PIXI.Graphics[] = [];
    trailOverlay: PIXI.Graphics;

    private constructor(app: PIXI.Application) {
        this.app = app;
        this.trailOverlay = new PIXI.Graphics();
        this.app.stage.addChild(this.trailOverlay);
    }

    static async create(width: number, height: number): Promise<Renderer> {
        const app = new PIXI.Application();
        await app.init({
            width,
            height,
            background: BACKGROUND_COLOR,
        });
        document.body.appendChild(app.canvas);
        
        return new Renderer(app);
    }

    private createBoidGraphics(): PIXI.Graphics {
        const color = BOID_PALETTE[Math.floor(Math.random() * BOID_PALETTE.length)];
        const g = new PIXI.Graphics();
        g.beginFill(color, 0.9);
        g.moveTo(12, 0);
        g.lineTo(-8, 6);
        g.lineTo(-8, -6);
        g.closePath();
        g.endFill();
        return g;
    }

    addBoidGraphic(): void {
        const g = this.createBoidGraphics();
        this.graphics.push(g);
        this.app.stage.addChild(g);
    }

    removeBoidGraphic(): void {
        const g = this.graphics.pop();
        if (g) this.app.stage.removeChild(g);
    }

    render(boids: Boid[]): void {

        for (let i = 0; i < boids.length; i++) {
            const boid = boids[i];
            const g = this.graphics[i];
            
            if (!g) continue;
            g.x = boid.position.x;
            g.y = boid.position.y;
            g.rotation = Math.atan2(boid.velocity.y, boid.velocity.x);
        }
    }
}