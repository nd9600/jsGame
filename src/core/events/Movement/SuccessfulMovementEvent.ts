import * as R from "ramda";
import { Place, Position, SuccessfulMovementEventData } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import Event from "@/core/events/Event";

export default class SuccessfulMovementEvent extends MovementEvent {
    public type = "SuccessfulMovementEvent";
    public data: SuccessfulMovementEventData;
    
    constructor(boardID: number, newCharacterPosition: Position) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = {boardID, newCharacterPosition};
        Event.dispatch(this.type, this.data);
    }

    public handle(state: GameState) {
        const newBoard = state.board
            .setPosition(state.board.characterPosition, Place.Empty)
            .setPosition(this.data.newCharacterPosition, Place.Character)
            .setCharacterPosition(this.data.newCharacterPosition);

        return new GameState(newBoard);
    }
}
