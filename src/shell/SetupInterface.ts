import { twoNumbers, BoardPosition } from "@/core/@typings/BoardTypes";

export interface SetupInterface {

    getInitialPlayerName(): string;

    /**
     * height x width
     * #rows x #columns
     *
     */
    getSize(): twoNumbers;

    getStartPoint(): BoardPosition;
    getEndPoint(): BoardPosition;

    getPlayerIDs(): [number, number];
    getBoardIDs(): [number, number];
}
