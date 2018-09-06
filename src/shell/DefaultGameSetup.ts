import { Position, twoNumbers } from "@/core/myTypes";
import { SetupInterface } from "@/shell/SetupInterface";

export default class DefaultGameSetup implements SetupInterface {
    public getInitialPlayerName(): string {
        return "";
    }

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
