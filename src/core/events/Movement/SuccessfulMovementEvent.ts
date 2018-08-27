import { Place, Position } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";

export default class SuccessfulMovementEvent extends MovementEvent {

    public data: Position;
    constructor(newCharacterPosition: Position) {
        super();
        this.data = newCharacterPosition;
    }

    public handle(state: GameState) {
        const newCharacterPosition = this.data;
        const newBoard = state.board
            .setPosition(state.characterPosition, Place.Empty)
            .setPosition(newCharacterPosition, Place.Character);

        return new GameState(newCharacterPosition, newBoard);
    }
}
