import * as PIXI from 'pixi.js';

export class Gradient extends PIXI.Sprite {
    constructor(stops: Array<GradientStop>, startPoint: PIXI.Point, endPoint: PIXI.Point, width: number, height: number) {
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;

        const ctx = c.getContext("2d");
        if (!ctx) return;

        let gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

        stops.forEach((stop) => {
            gradient.addColorStop(stop.stop, stop.color);
        })

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        let texture = PIXI.Texture.from(c);
        super(texture);
    }
}

export type GradientStop = {
    stop: number;
    color: string;
}
