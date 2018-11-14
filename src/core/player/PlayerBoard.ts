import { BoardPosition, Status } from "@/core/@typings/BoardTypes";

export default class PlayerBoard {
    constructor(
        public readonly playerID: number,
        public readonly boardID: number,
        public readonly characterPosition: BoardPosition,
        public readonly boardStatus: Status,
    ) {
    }
}
