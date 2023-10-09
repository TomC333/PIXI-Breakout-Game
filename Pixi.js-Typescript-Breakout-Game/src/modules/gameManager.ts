import * as PIXI from 'pixi.js'
import { Layout } from './layout';
import { Game } from './game';
import { Gradient } from '../gradient';
import { GameState } from './enums';
import { Backgrounds } from '../backgrounds';
import { DialogMenu } from './gameMenu/dialogMenu';
import { Musics } from './musics';


export class GameManager {

    private gameManager: PIXI.Application<HTMLCanvasElement>;
    private game!: Game;
    private isRunning = false;
    private isGameAdded = false;
    private canvasGradient!: Gradient;
    private dialogMenu!: DialogMenu;


    constructor() {

        this.gameManager = new PIXI.Application({
            width: Layout.canvas.width,
            height: Layout.canvas.height,
            backgroundColor: Layout.canvas.color,
            antialias: true,
        });
        this.gameManager.stage.sortableChildren = true;
        document.body.appendChild(this.gameManager.view);

        this.initializeCanvasBG();
        this.initializeGameBackgroundAndGame();
        this.initializeDialogMenu();
    }

    private initializeDialogMenu(): void{
        this.dialogMenu = new DialogMenu(Layout.dialogTexts.welcome);
        this.gameManager.stage.addChild(this.dialogMenu.getElement());
    }

    private initializeCanvasBG(): void {

        this.canvasGradient = Backgrounds.getCanvasBackground(GameState.PAUSE);
        this.gameManager.stage.addChild(this.canvasGradient);

        setInterval(() => {
            this.canvasGradient.rotation += 0.1;
        }, Layout.gameBackgroundOptions.updateInterval);
    }

    private initializeGameBackgroundAndGame(): void {

        // add gradient to bg 
        const gradient = new Gradient(Layout.gameBackground.stops, Layout.gameBackground.startPoint, Layout.gameBackground.endPoint, Layout.gameBackground.width, Layout.gameBackground.height);
        gradient.x = Layout.game.startX;
        gradient.y = Layout.game.startY;
        gradient.zIndex = Layout.zIndexes.gameBackground;
        this.gameManager.stage.addChild(gradient);

        this.game = new Game(this.gameManager, this.stopGame.bind(this), gradient);
    }

    startGameManager(): void {

        this.buildGame();
        this.dialogMenu.toggleVisibility();
        this.startGame();
    }

    private updateCanvasBackground(gameState: number){
  
        this.gameManager.stage.removeChild (this.canvasGradient);
        this.canvasGradient = Backgrounds.getCanvasBackground(gameState);
        this.gameManager.stage.addChild(this.canvasGradient);
    }

    private startGame(): void {

        this.gameManager.view.addEventListener('click', () => {

            if(!this.isGameAdded){
                this.isGameAdded = true;
                this.gameManager.ticker.add(this.game.startGame.bind(this.game));
            }

            if (!this.isRunning) {
                this.dialogMenu.toggleVisibility();
                this.game.IsRunning = true;
                this.updateCanvasBackground(GameState.STARTING);
                this.gameManager.ticker.start();
                this.isRunning = true;
            }
        });
    }

    private stopGame(gameState: number): void {

        this.startShakeEffect();

        switch(gameState){
            case GameState.CONTINUE:
                this.updateCanvasBackground(GameState.CONTINUE);
                this.dialogMenu.updateText(Layout.dialogTexts.continue);
                this.game.continueGame();
                Musics.healthLost();
                break;
            case GameState.LOSE:
                this.updateCanvasBackground(GameState.LOSE);
                this.dialogMenu.updateText(Layout.dialogTexts.lost);
                this.game.resetGame();
                Musics.gameLost();
                break;
            case GameState.WIN:
                this.updateCanvasBackground(GameState.WIN);    
                this.dialogMenu.updateText(Layout.dialogTexts.win); 
                this.game.resetGame()

                break;
        }

        setTimeout( () => {
            this.gameManager.ticker.stop();
            this.isRunning = false;
        }, Layout.shake.timeout)

        this.dialogMenu.toggleVisibility();
    }

    private buildGame(): void {
        this.game.drawGameElements();
    }

    private startShakeEffect() {
        const startTime = Date.now();
        const originalX = this.gameManager.stage.x;
        const originalY = this.gameManager.stage.y;
    
        const shakeAnimation = () => {
          const currentTime = Date.now();
          const elapsedTime = (currentTime - startTime) / 1000;
    
          if (elapsedTime < Layout.shake.shakeDuration) {
            const randomX = (Math.random() - 0.5) * 2 * Layout.shake.shakeMagnitude;
            const randomY = (Math.random() - 0.5) * 2 * Layout.shake.shakeMagnitude;
    
            this.gameManager.stage.x = originalX + randomX;
            this.gameManager.stage.y = originalY + randomY;
    
            requestAnimationFrame(shakeAnimation);
          } else {
            
            // restore to original point after shake 
            this.gameManager.stage.x = originalX;
            this.gameManager.stage.y = originalY;
          }
        };
    
        requestAnimationFrame(shakeAnimation);
    }
}