import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import { Place, Position, SuccessfulMovementEventData } from "@/core/myTypes";
import * as R from "ramda";

export default class SuccessfulMovementEvent extends MovementEvent {
    public readonly type = "SuccessfulMovementEvent";
    public readonly data: SuccessfulMovementEventData;
    
    constructor(boardID: number, newCharacterPosition: Position) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = {boardID, newCharacterPosition};
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(state: GameState) {
        const newBoard = state.boards[this.data.boardID]
            .setPosition(state.boards[this.data.boardID].characterPosition, Place.Empty)
            .setPosition(this.data.newCharacterPosition, Place.Character)
            .setCharacterPosition(this.data.newCharacterPosition);

        return state.replaceBoard(newBoard);
    }
}
