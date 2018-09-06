import {Position, twoNumbers} from "@/core/myTypes";

export interface SetupInterface {

    getInitialPlayerName(): string;

    /**
     * height x width
     * #rows x #columns
     *
     */
    getSize(): twoNumbers;

    getStartPoint(): Position;
    getEndPoint(): Position;
}
