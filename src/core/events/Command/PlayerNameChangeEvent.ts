import { PlayerNameChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import BoardBuilder from "@/core/board/BoardBuilder";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class PlayerNameChangeEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "PlayerNameChangeEvent";
    public data: PlayerNameChangeEventData;

    constructor(playerNameChangeEventData: PlayerNameChangeEventData) {
        super(playerNameChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = playerNameChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, {player: this.data.newPlayerName});
        return gameState.replaceBoard(newBoard);
    }
}
