import {SetupInterface} from "@/shell/SetupInterface";
import {twoNumbers, Position} from "@/core/myTypes";

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
}
