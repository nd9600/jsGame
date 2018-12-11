import { twoNumbers, BoardPosition } from "@/core/@typings/BoardTypes";
import { SetupInterface } from "@/shell/SetupInterface";

export default class DefaultGameSetup implements SetupInterface {
    public getInitialPlayerName(): string {
        return "";
    }

    public getSize(): twoNumbers {
        return [4, 4];
    }

    public getStartPoint(): BoardPosition {
        return {
            x: 0,
            y: 0
        };
    }

    public getEndPoint(): BoardPosition {
        return {
            x: 3,
            y: 3
        };
    }

    public getPlayerIDs(): [number, number] {
        return [0, 1];
    }
    
    public getBoardIDs(): [number, number] {
        return [0, 1];
    }
}
