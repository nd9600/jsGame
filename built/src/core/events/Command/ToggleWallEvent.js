import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import * as R from "ramda";
export default class ToggleWallEvent extends CommandEvent {
    constructor(toggleWallEventData) {
        super(toggleWallEventData);
        this.type = "ToggleWallEvent";
        this.types = R.append(this.type, this.types);
        this.data = toggleWallEventData;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = oldBoard.toggleWallAtPosition(this.data.positionToToggle);
        return gameState.replaceBoard(newBoard);
    }
}
//# sourceMappingURL=ToggleWallEvent.js.map