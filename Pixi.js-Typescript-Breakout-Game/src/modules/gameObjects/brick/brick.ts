import * as PIXI from 'pixi.js';
import { Layout } from '../../layout';
import { Collisions } from '../../enums';
import { Ball } from '../ball';

export class Brick{

    private graphics = new PIXI.Graphics();
    private brickDrawing: PIXI.Graphics;
    private isAlive = true; 

    constructor(private x: number, private y: number, private color: string) {
        this.graphics.beginFill(this.color);
        this.brickDrawing = this.graphics.drawRect(0, 0, Layout.brick.width, Layout.brick.height);
        this.graphics.endFill();

        this.brickDrawing.zIndex = Layout.zIndexes.gameObjects;
    }

    public get X(): number {
        return this.x;
    }

    public get Y(): number {
        return this.y;
    }

    public get IsAlive(): boolean{
        return this.isAlive;
    }

    public get Height(): number{
        return Layout.brick.height;
    }

    public get Width(): number{
        return Layout.brick.width;
    }

    public destroyBrick(): void{
        this.isAlive = false;
    }

    // xD
    public giveNewLife(): void {
        this.isAlive = true;
    }

    public getElement(): PIXI.Graphics {
        this.brickDrawing.x = this.x;
        this.brickDrawing.y = this.y;
        return this.brickDrawing;
    }

    public checkCollision(ball: Ball): number{


        if(ball.X + ball.Radius > this.x && ball.X - ball.Radius < this.x + Layout.brick.width && ball.Y + ball.Radius > this.y && ball.Y - ball.Radius < this.y + Layout.brick.height){

            if(ball.Y - ball.Radius >= this.y + Layout.brick.height / 2 ) return Collisions.BOTTOM;
            return Collisions.TOP;
        }
        
        return Collisions.NO_HIT;
    }
}