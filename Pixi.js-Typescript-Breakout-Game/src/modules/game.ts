import { Gradient } from "../gradient";
import { Collisions, GameState } from "./enums";
import { Ball } from "./gameObjects/ball";
import { Brick } from "./gameObjects/brick/brick";
import { BrickPositionCalculator } from "./gameObjects/brick/brickPositionCalculator";
import { Paddle } from "./gameObjects/paddle";
import { Layout } from "./layout";
import * as PIXI from 'pixi.js';

export class Game {

    private ball = new Ball();
    private bricks: Brick[] = [];
    private paddle = new Paddle();

    private isRunning = false;
    private bricksCount = Layout.game.numberOfBrickRows * Layout.game.numberOfBricksPerRow;
    private livesCount = Layout.game.lives;

    constructor(private gameManager: PIXI.Application<HTMLCanvasElement>, private stopGameFunction: (gameState: number) => void, gameWindow: Gradient) {

        this.initializeBricks();
        gameWindow.interactive = true;

        let x = Layout.paddle.startX;
        let possibleX = Layout.paddle.startX;

        setInterval(() => {

            if(this.isRunning){ 

                const possibleDiff = possibleX - x;
                const possibleDiffModule = Math.abs(possibleDiff);
                x += Math.min(possibleDiffModule, Layout.game.paddleUpdateMaxDiff) * (possibleDiffModule / possibleDiff | 1)
                this.paddle.setPosition(x);
            }else{
                x = Layout.paddle.startX;
                possibleX = x;
            }
           

        }, Layout.game.paddleUpdateInterval);


        window.addEventListener('mousemove', (e) => {
            if (this.isRunning) {
                possibleX = this.caclulateNewX(e);
            }
        });
    }

    private caclulateNewX(e: MouseEvent): number {

        const screenDiff = this.gameManager.view.getBoundingClientRect().x;
        const currentX = e.x - Layout.paddle.width / 2 - screenDiff;
        const maxX = Layout.game.endX - Layout.paddle.width;
        const minX = Layout.game.startX;


        return Math.max(Math.min(currentX, maxX), minX);
    }

    private initializeBricks(): void {
        for (let i = 0; i < Layout.game.numberOfBrickRows; i++) {
            for (let j = 0; j < Layout.game.numberOfBricksPerRow; j++) {
                const positions = BrickPositionCalculator.calculateBrickPosition(i, j);
                this.bricks.push(new Brick(positions[0], positions[1], Layout.brick.colors[i]));
            }
        }
    }

    drawGameElements(): void {

        this.drawPaddle();
        this.drawBall();
        this.drawBricks();
    }

    private drawBall(): void {
        this.gameManager.stage.addChild(this.ball.getElement());
    }

    private drawBricks(): void {
        for (let i = 0; i < this.bricks.length; i++) {
            this.gameManager.stage.addChild(this.bricks[i].getElement());
        }
    }

    private drawPaddle(): void {
        this.gameManager.stage.addChild(this.paddle.getElement());
    }

    private isWallCollision(): number {
        if (this.ball.Y - Layout.ball.radius <= Layout.game.startY) return Collisions.TOP;
        if (this.ball.X - Layout.ball.radius <= Layout.game.startX || this.ball.X + Layout.ball.radius >= Layout.game.endX) return Collisions.SIDE;
        if (this.ball.Y + Layout.ball.radius >= Layout.game.endY) return Collisions.BOTTOM;

        return Collisions.NO_HIT;
    }
    // function returns true if game should stop
    private checkWallCollsion(): boolean {

        switch (this.isWallCollision()) {
            case Collisions.SIDE:
                this.ball.SpeedX = -this.ball.SpeedX;
                return false;
            case Collisions.TOP:
                this.ball.SpeedY = -this.ball.SpeedY;
                return false;
            case Collisions.BOTTOM:
                this.ball.SpeedY = -this.ball.SpeedY;
                return true;
        }

        return false;

    }

    private isSideHitt(collider: Brick | Paddle): boolean {

        if ((this.ball.X > collider.X + collider.Width || this.ball.X < collider.X) && this.ball.Y >= collider.Y && this.ball.Y <= collider.Y + collider.Height) return true;
        return false;
    }

    private checkBricksCollision(): void {
        for (let i = 0; i < this.bricks.length; i++) {

            if (!this.bricks[i].IsAlive) continue;

            let collision = this.bricks[i].checkCollision(this.ball);
            if (collision === Collisions.NO_HIT) continue;

            collision = this.isSideHitt(this.bricks[i]) ? Collisions.SIDE : collision;
            this.gameManager.stage.removeChild(this.bricks[i].getElement())
            this.bricks[i].destroyBrick();
            this.bricksCount--;

            switch (collision) {
                case Collisions.SIDE:
                    this.ball.SpeedX = -this.ball.SpeedX;
                    break;
                case Collisions.TOP:
                case Collisions.BOTTOM:
                    this.ball.SpeedY = -this.ball.SpeedY;
            }
        }
    }

    private checkPaddleCollision(): void {

        const collision = this.paddle.checkCollision(this.ball);
        if (collision == Collisions.NO_HIT) return;

        if (this.ball.Y >= this.paddle.Y) {
            this.ball.setPosition(this.ball.X, this.paddle.Y + this.paddle.Height + this.ball.Radius * 2 + 1);

        } else this.ball.SpeedY = - this.ball.SpeedY;
    }

    private resetMainObjects(): void {
        this.paddle.resetPaddle();
        this.ball.resetBall();
    }

    private invokeBricks(): void {
        for (let i = 0; i < this.bricks.length; i++) {
            if (!this.bricks[i].IsAlive) {
                this.bricks[i].giveNewLife();
                continue;
            }
            this.gameManager.stage.removeChild(this.bricks[i].getElement());
        }

        this.drawBricks();
    }

    public set IsRunning(value: boolean){
        this.isRunning = value;
    }

    resetGame(): void {
        this.resetMainObjects();
        this.invokeBricks();
        this.bricksCount = Layout.game.numberOfBrickRows * Layout.game.numberOfBricksPerRow;
        this.livesCount = Layout.game.lives;
    }

    continueGame(): void {
        this.resetMainObjects();
    }

    startGame(): void {
        
        if(!this.isRunning) return;
        this.ball.updatePosition();

        if (this.bricksCount == 0) {
            this.isRunning = false;
            this.stopGameFunction(GameState.WIN);
            return;
        }

        if (this.checkWallCollsion()) {
            this.isRunning = false;
            this.livesCount--;
            if (this.livesCount == 0) {
                this.stopGameFunction(GameState.LOSE);
                return;
            }
            this.stopGameFunction(GameState.CONTINUE);
            return;
        }

        this.checkBricksCollision();
        this.checkPaddleCollision();
    }
}