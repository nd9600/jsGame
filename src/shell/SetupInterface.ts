import {Position, twoNumbers} from "@/core/myTypes";

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
