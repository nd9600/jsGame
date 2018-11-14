import BoardBuilder from "@/core/board/BoardBuilder";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import * as R from "ramda";
export default class StatusChangeEvent extends CommandEvent {
    constructor(statusChangeEventData) {
        super(statusChangeEventData);
        this.type = "StatusChangeEvent";
        this.types = R.append(this.type, this.types);
        this.data = statusChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, { status: this.data.newStatus });
        return gameState.replaceBoard(newBoard);
    }
}
//# sourceMappingURL=StatusChangeEvent.js.map