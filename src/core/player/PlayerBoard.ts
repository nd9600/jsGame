import { BoardPosition } from "@/core/@typings/BoardTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";

export default class PlayerBoard {
    constructor(
        public readonly playerID: number,
        public readonly boardID: number,
        public readonly characterPosition: BoardPosition,
        public readonly boardStatus: PlayerBoardStatus,
    ) {
    }

    public getCurrentInfo(): string {
        return `Player #${this.playerID}, Board #${this.boardID}
Character position: ${JSON.stringify(this.characterPosition)}
Board Status: ${this.boardStatus}\n`;
    }
}
