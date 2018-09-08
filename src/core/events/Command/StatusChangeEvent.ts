import BoardBuilder from "@/core/board/BoardBuilder";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import { StatusChangeEventData } from "@/core/myTypes";
import * as R from "ramda";

export default class StatusChangeEvent extends CommandEvent {
    public type = "StatusChangeEvent";
    public data: StatusChangeEventData;

    constructor(statusChangeEventData: StatusChangeEventData) {
        super(statusChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = statusChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, {status: this.data.newStatus});
        return gameState.replaceBoard(newBoard);
    }
}
