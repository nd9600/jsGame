import { SetPlayerBoardStatusToFinishedEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";

export default class SetPlayerBoardStatusToFinishedEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "SetPlayerBoardStatusToFinishedEvent";
    public data: SetPlayerBoardStatusToFinishedEventData;

    constructor(setPlayerBoardStatusToFinishedEventData: SetPlayerBoardStatusToFinishedEventData) {
        super(setPlayerBoardStatusToFinishedEventData);
        this.types = R.append(this.type, this.types);
        this.data = setPlayerBoardStatusToFinishedEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const playerBoard = gameState.getPlayerBoard(this.data.playerID, this.data.boardID);
        const newGameState = gameState.replacePlayerBoard(PlayerBoardBuilder.mergeWithOptions(playerBoard, {
            boardStatus: PlayerBoardStatus.Finished
        }));
        return newGameState;
    }
}
