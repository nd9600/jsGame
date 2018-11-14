import { Status } from "@/core/@typings/BoardTypes";
import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";
export default class SuccessfulMovementEvent extends MovementEvent {
    constructor(successfulMovementEventData) {
        super();
        this.type = "SuccessfulMovementEvent";
        this.types = R.append(this.type, this.types);
        this.data = successfulMovementEventData;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        const playerBoard = gameState.getPlayerBoard(this.data.playerID, this.data.boardID);
        const board = gameState.boards[this.data.boardID];
        const boardIsSolved = R.equals(this.data.newCharacterPosition, board.endPoint);
        return gameState.replacePlayerBoard(PlayerBoardBuilder.mergeWithOptions(playerBoard, {
            characterPosition: this.data.newCharacterPosition,
            boardStatus: (boardIsSolved ? Status.Finished : Status.Playing)
        }));
    }
}
//# sourceMappingURL=SuccessfulMovementEvent.js.map