import {SetupInterface} from "@/shell/SetupInterface";
import {twoNumbers, Position, Place} from "@/core/myTypes";
import GameState from "@/core/GameState";
import Board from "@/core/board/Board";

export default class TestSetup implements SetupInterface {
    public getSize(): twoNumbers {
        return [4, 4];
    }

    public getStartPoint(): Position {
        return {
            x: 0,
            y: 0
        };
    }

    public getEndPoint(): Position {
        return {
            x: 3,
            y: 3
        };
    }
}
