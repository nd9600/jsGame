import * as R from "ramda";
import boardFunctions from "@/core/board/board";
import { GameState, Place, Position } from "@/core/myTypes";
import MovementEvent from "@/core/events/MovementEvent";

export default class SuccessfulMovementEvent extends MovementEvent {

    public data: Position;
    constructor(newCharacterPosition: Position) {
        super();
        this.data = newCharacterPosition;
    }

    public handle(state: GameState) {
        const {characterPosition, board} = state;

        const newBoard = R.compose(
            boardFunctions.setPosition(characterPosition, Place.Empty),
            boardFunctions.setPosition(this.data, Place.Character)
        )(board);

        return R.merge(state, {
            characterPosition: this.data,
            board: newBoard
        });
    }
}
