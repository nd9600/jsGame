import {Position, twoNumbers} from "@/game/myTypes";

export interface SetupInterface {

    /**
     * height x width
     * #rows x #columns
     *
     */
    getSize(): twoNumbers;

    getStartPoint(): Position;
    getEndPoint(): Position;
}
