import {SetupInterface} from "@/shell/SetupInterface";
import {twoNumbers, Position, Place} from "@/core/myTypes";
import GameState from "@/core/GameState";
import Board from "@/core/board/Board";

export default class DefaultGameSetup implements SetupInterface {
    public getSize(): twoNumbers {
        return [9, 9];
    }

    public getStartPoint(): Position {
        return {
            x: 0,
            y: 0
        };
    }

    public getEndPoint(): Position {
        return {
            x: 8,
            y: 8
        };
    }
}
