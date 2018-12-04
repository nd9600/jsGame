import { SuccessfulMovementEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";

export default class SuccessfulMovementEvent extends MovementEvent {
    public type: DispatchedEventNameTypes = "SuccessfulMovementEvent";
    public data: SuccessfulMovementEventData;
    
    constructor(successfulMovementEventData: SuccessfulMovementEventData) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = successfulMovementEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState) {
        const playerBoard = gameState.getPlayerBoard(this.data.playerID, this.data.boardID);
        const board = gameState.boards[this.data.boardID];
        const boardIsSolved = R.equals(this.data.newCharacterPosition, board.endPoint);

        return gameState.replacePlayerBoard(PlayerBoardBuilder.mergeWithOptions(playerBoard, {
            characterPosition: this.data.newCharacterPosition,
            boardStatus: (boardIsSolved ? PlayerBoardStatus.Finished : PlayerBoardStatus.Playing)
        }));
    }
}
