import { GradientStop } from "../gradient";
import * as PIXI from 'pixi.js';


export class Layout{

    static randomNumber(min: number, max: number): number{
        return Math.random() * (max - min) + min;
    }

    static randomBoolean(probability: number): boolean{
        return Math.random() >= probability;
    }

    static canvas = {

        width: 410,
        height: 740,
        color: 'cyan',
    }

    static get game(){

        const width = 400;
        const height = 730;
        const startX = (Layout.canvas.width - width) / 2;
        const startY = (Layout.canvas.height - height) / 2;

        return {
            startX: startX,
            startY: startY,
            endX: startX + width,
            endY: startY + height,
            width: width,
            height: height,
            lives: 3,
            numberOfBrickRows: 10,
            numberOfBricksPerRow: 10,
            brickSeparation: 4,
            bricksYOffset: 70 + startY,
            paddleYOffset: 70,
            paddleUpdateInterval: 1000 / 60,
            paddleUpdateMaxDiff: 10,
        }
    }

    static dialogMenu = {
        width: Layout.game.width,
        height: Layout.game.height,
        startX: Layout.game.startX,
        startY: Layout.game.startY,
        backgroundColor: 0x0000FF,
        backgroundVisibility: 1,

    }

    static textStyle = new PIXI.TextStyle({
        align: "center",
        fill: "#ffffff",
        fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
        fontSize: 40,
        fontVariant: "small-caps",
        fontWeight: "bold",
        whiteSpace: "normal",
        wordWrap: true,
        wordWrapWidth: 400
    });

    static dialogTexts = {
        welcome: "hello to breakout click on screen to start playing",
        continue: "you have more lives click to continue",
        lost: "you lost game click to start again",
        win: "congrats you win game you can play again by clicking",


    }

    static get ball() {

        const minSpeed = 1;
        const maxSpeed = 2;
        const speed = Layout.randomNumber(minSpeed, maxSpeed);

        return {
            startX: Layout.game.startX + Layout.game.width / 2,
            startY: Layout.game.startY + Layout.game.height / 2,
            speedX: Layout.randomBoolean(0.5) ? speed : -speed,
            speedY: maxSpeed,
            radius: 5,
            color: 'white',
            speedIncrement: 1.01,
            speedIncrementTimeout: 100,
        }
    }

    static brick = { 

        width: (this.game.width - (this.game.numberOfBricksPerRow + 1) * this.game.brickSeparation) / this.game.numberOfBricksPerRow,
        height: 8,
        colors: ['0xFF0000', '0xFF5500', '0xFFAA00', '0xFFD400', '0xFFFF00', '0xAAFF00', '0x55FF00', '0x00FF00', '0x00FF55', '0x00FFFF'],
    }

    static get paddle () {

        const width = 60;
        return {
            width: width,
            height: 10,
            startX: Layout.game.startX + (Layout.game.width - width) / 2,
            startY: Layout.game.endY - Layout.game.paddleYOffset, 
            color: 'white',
        }
    }

    static gameBackground = {
        width: this.game.width,
        height: this.game.height,
        stops: [<GradientStop>{ color: '#b82aa9', stop: 0 },
        <GradientStop>{ color: '#4b0e95', stop: 0.5 },
        <GradientStop>{ color: '#00d4ff', stop: 1 }],
        startPoint: <PIXI.Point>{ x: 0, y: 0 },
        endPoint: <PIXI.Point>{ x: this.canvas.width , y: this.canvas.height }
    }

    static gameBackgroundOptions = {
        width: 2 * Math.sqrt(Layout.canvas.width * Layout.canvas.width / 4 + Layout.canvas.height * Layout.canvas.height / 4),
        height: 2 * Math.sqrt(Layout.canvas.width * Layout.canvas.width / 4 + Layout.canvas.height * Layout.canvas.height / 4),
        startPoint: <PIXI.Point>{ x: 0, y: 0 },
        endPoint: <PIXI.Point>{ x: this.canvas.width , y: this.canvas.height },
        updateInterval: 40,

    }

    static backgroundWhilePlaying = {
        stops: [
            { color: '#ff0000', stop: 0 },
            { color: '#ff5500', stop: 0.1 },
            { color: '#ffaa00', stop: 0.2 },
            { color: '#ffff00', stop: 0.3 },
            { color: '#aaff00', stop: 0.4 },
            { color: '#55ff00', stop: 0.5 },
            { color: '#00ff00', stop: 0.6 },
            { color: '#00ffaa', stop: 0.7 },
            { color: '#00ffff', stop: 0.8 },
            { color: '#0055ff', stop: 0.9 },
            { color: '#0000ff', stop: 1 }
        ],
    }

    static backgroundWhileLostLiveOrPause = {
        stops: [
            { color: '#2196F3', stop: 1 }
        ],
    }

    static backgroundWhileLost =  {
        stops: [
            { color: '#FF0000', stop: 1 }
        ],
    }

    static backgroundWhileWin = {
        stops: [
            { color: '#FFD700', stop: 1 }
        ],
    }

    static zIndexes = {
        background: 1,
        gameBackground: 2,
        gameObjects: 3,
        dialogMenu: 4,
    }

    static shake = {
        shakeDuration: 25 / 100,
        shakeMagnitude: 8,
        timeout: 300,

    }

    static healthIcon = {
        scale: 0.1,
        x: Layout.game.startX + 10,  
        y: Layout.game.startY + 10,
        diffX: 25,
        color: '#FF0000',
    }
}