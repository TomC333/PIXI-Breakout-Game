import { Layout } from "../layout";
import * as PIXI from 'pixi.js';
import { Ball } from "./ball";
import { Collisions } from "../enums";

export class Paddle {

    private graphics = new PIXI.Graphics();
    private paddleDrawing: PIXI.Graphics;

    constructor() {

        this.graphics.beginFill(Layout.paddle.color);
        this.paddleDrawing = this.graphics.drawRect(0, 0, Layout.paddle.width, Layout.paddle.height);
        this.graphics.endFill();

        this.paddleDrawing.zIndex = Layout.zIndexes.gameObjects;
    }

    public get X(): number {
        return this.paddleDrawing.position.x;
    }

    public get Y(): number {
        return this.paddleDrawing.y;
    }

    public get Height(): number {
        return Layout.paddle.height;
    }

    public get Width(): number {
        return Layout.paddle.width;
    }

    public setPosition(x: number): void { 
        this.paddleDrawing.position.x = x;
    }

    public getElement(): PIXI.Graphics {
        this.paddleDrawing.x = Layout.paddle.startX;
        this.paddleDrawing.y = Layout.paddle.startY;
        return this.paddleDrawing;
    }

    public resetPaddle(): void {
        this.paddleDrawing.x = Layout.paddle.startX;
        this.paddleDrawing.y = Layout.paddle.startY;
    }

    public checkCollision(ball: Ball): number {

        if (ball.X + ball.Radius > this.paddleDrawing.x && ball.X - ball.Radius < this.paddleDrawing.x + Layout.paddle.width
            && ball.Y + ball.Radius > this.paddleDrawing.y && ball.Y - ball.Radius < this.paddleDrawing.y + Layout.paddle.height) {

            if (ball.Y - ball.Radius >= this.paddleDrawing.y + Layout.paddle.height / 2) {
                return Collisions.BOTTOM;
            }
            return Collisions.TOP;
        }

        return Collisions.NO_HIT;
    }
}