import {SetupInterface} from "@/shell/SetupInterface";
import {twoNumbers, Position, Place} from "@/core/myTypes";
import GameState from "@/core/GameState";
import Board from "@/core/board/Board";

export default class TestSetup implements SetupInterface {
    public getSize(): twoNumbers {
        return [10, 10];
    }

    public getStartPoint(): Position {
        return {
            x: 0,
            y: 9
        };
    }

    public getEndPoint(): Position {
        return {
            x: 9,
            y: 9
        };
    }

    public getEmptyGameState(): GameState {
        return new GameState( 
            new Board(Board.idCounter++, [[Place.Character]], this.getStartPoint(), this.getEndPoint())
        );
    }
}