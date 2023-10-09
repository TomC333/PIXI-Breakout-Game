import { Layout } from "../../layout";

export class BrickPositionCalculator {

    static calculateBrickPosition(i: number, j: number): number[] {

        const y = Layout.game.startY + Layout.game.bricksYOffset + i * (Layout.brick.height + Layout.game.brickSeparation);
        const x = Layout.game.startX + Layout.game.brickSeparation + j * (Layout.brick.width + Layout.game.brickSeparation);
        return [x, y];
    }

}