import { ToggleWallEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class ToggleWallEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "ToggleWallEvent";
    public data: ToggleWallEventData;

    constructor(toggleWallEventData: ToggleWallEventData) {
        super(toggleWallEventData);
        this.types = R.append(this.type, this.types);
        this.data = toggleWallEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = oldBoard.toggleWallAtPosition(this.data.positionToToggle);
        return gameState.replaceBoard(newBoard);
    }
}
