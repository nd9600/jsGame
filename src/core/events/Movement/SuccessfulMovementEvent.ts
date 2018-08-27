import { Place, Position } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";

export default class SuccessfulMovementEvent extends MovementEvent {

    public type = "SuccessfulMovementEvent";
    public data: Position;
    
    constructor(newCharacterPosition: Position) {
        super();
        this.data = newCharacterPosition;
    }

    public handle(state: GameState) {
        const newCharacterPosition = this.data;
        const newBoard = state.board
            .setPosition(state.board.characterPosition, Place.Empty)
            .setPosition(newCharacterPosition, Place.Character)
            .setCharacterPosition(newCharacterPosition);

        return new GameState(newBoard);
    }
}
