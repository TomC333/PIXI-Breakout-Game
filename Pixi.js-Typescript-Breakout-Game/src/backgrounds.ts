import { Gradient } from "./gradient";
import { GameState } from "./modules/enums";
import { Layout } from "./modules/layout";

export class Backgrounds{

    static getCanvasBackground(gameState: number): Gradient{
        
        let stops;

        switch(gameState){
            case GameState.CONTINUE:
            case GameState.PAUSE:
                stops = Layout.backgroundWhileLostLiveOrPause.stops;
                break;
            case GameState.LOSE:
                stops = Layout.backgroundWhileLost.stops;
                break;
            case GameState.WIN:
                stops = Layout.backgroundWhileWin.stops;
                break;
            case GameState.STARTING:
            default:
                stops = Layout.backgroundWhilePlaying.stops;
        }

        let gradient = new Gradient(stops, Layout.gameBackgroundOptions.startPoint, Layout.gameBackgroundOptions.endPoint, Layout.gameBackgroundOptions.width, Layout.gameBackgroundOptions.height);
        gradient.anchor.set(0.5);
        gradient.x = Layout.canvas.width / 2;
        gradient.y = Layout.canvas.height / 2;
        gradient.zIndex = Layout.zIndexes.background;

        return gradient;
    }
}