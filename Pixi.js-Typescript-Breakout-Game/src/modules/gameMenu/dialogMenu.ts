import * as PIXI from 'pixi.js'
import { Layout } from '../layout';

export class DialogMenu{
    
    private dialogContainer: PIXI.Container;
    private text: PIXI.Text;


    constructor(text: string){

        this.dialogContainer = new PIXI.Container();


        const background = new PIXI.Graphics();
        background.beginFill(Layout.dialogMenu.backgroundColor, Layout.dialogMenu.backgroundVisibility); 
        background.drawRect(0, 0, Layout.game.width, Layout.game.height);
        background.endFill();
        background.x = Layout.game.startX;
        background.y = Layout.game.startY;
        this.dialogContainer.addChild(background);

        this.text = new PIXI.Text(text, Layout.textStyle);
        this.centerText();
        this.dialogContainer.addChild(this.text);
        this.dialogContainer.visible = false;
    }

    private centerText(){
        this.text.position.set((Layout.canvas.width - this.text.width) / 2, (Layout.canvas.height - this.text.height) / 2); 
    }

    updateText(newText: string){
        this.text.text = newText;
        this.centerText()
    }

    toggleVisibility(){
        this.dialogContainer.visible = !this.dialogContainer.visible;
    }

    getElement(){
        this.dialogContainer.zIndex = Layout.zIndexes.dialogMenu;
        return this.dialogContainer;
    }
}