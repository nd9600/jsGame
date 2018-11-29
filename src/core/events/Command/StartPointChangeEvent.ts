import { StartPointChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import BoardBuilder from "@/core/board/BoardBuilder";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class StartPointChangeEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "StartPointChangeEvent";
    public data: StartPointChangeEventData;

    constructor(startPointChangeEventData: StartPointChangeEventData) {
        super(startPointChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = startPointChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, {startPoint: this.data.newStartPoint});
        return gameState.replaceBoard(newBoard);
    }
}
