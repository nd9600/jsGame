import { Position, twoNumbers } from "@/core/myTypes";
import { SetupInterface } from "@/shell/SetupInterface";

export default class DefaultGameSetup implements SetupInterface {
    public getInitialPlayerName(): string {
        return "";
    }

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
