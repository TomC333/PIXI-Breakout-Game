import { Layout } from "../layout";
import *  as PIXI from 'pixi.js'

export class Ball {

    private speedX = Layout.ball.speedX;
    private speedY = Layout.ball.speedY;
    private graphics = new PIXI.Graphics();
    private ballDrawing: PIXI.Graphics;
    private speedMultiplicator: number = 1;

    private oldX: number = Layout.ball.startX;
    private oldY: number = Layout.ball.startY;


    constructor() {
        this.graphics.beginFill(Layout.ball.color);
        this.ballDrawing = this.graphics.drawCircle(0, 0, Layout.ball.radius);
        this.graphics.endFill();

        this.ballDrawing.zIndex = Layout.zIndexes.gameObjects;

        setInterval(() => {
            if(this.speedX > Layout.ball.maxSpeed || this.speedY > Layout.ball.maxSpeed){
                return;
            }
            this.speedMultiplicator *= Layout.ball.speedIncrement;
        }, Layout.ball.speedIncrementTimeout);

        this.resetBall();
    }

    public get X(): number {
        return this.ballDrawing.x;
    }

    public get Y(): number {
        return this.ballDrawing.y;
    }

    public get OldX(): number{
        return this.oldX;
    }

    public get OldY(): number{
        return this.oldY;
    }

    public set SpeedX(value: number) {
        this.speedX = value;
    }

    public get SpeedX(): number {
        return this.speedX;
    }

    public set SpeedY(value: number) {
        this.speedY = value;
    }

    public get SpeedY(): number {
        return this.speedY;
    }

    public get Radius(): number {
        return Layout.ball.radius;
    }

    public setPosition(x: number, y: number): void {
        this.ballDrawing.x = x;
        this.ballDrawing.y = y;
    }

    public updatePosition(): void {

        this.oldX = this.ballDrawing.x;
        this.oldY = this.ballDrawing.y;

        this.ballDrawing.x += this.speedMultiplicator * this.speedX;
        this.ballDrawing.y += this.speedMultiplicator * this.speedY;
    }

    public getElement(): PIXI.Graphics {
        this.resetBall();
        return this.ballDrawing;
    }

    public resetBall(): void {
        this.speedMultiplicator = 1;
        this.speedX = Layout.ball.speedX;
        this.speedY = Layout.ball.speedY;

        this.ballDrawing.x = Layout.ball.startX;
        this.ballDrawing.y = Layout.ball.startY;

        this.oldX = Layout.ball.startX;
        this.oldY = Layout.ball.startY;
    }
}