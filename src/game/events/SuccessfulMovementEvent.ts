import * as R from "ramda";
import boardFunctions from "@/game/board/board";
import { GameState, Place, Position } from "@/game/myTypes";
import MovementEvent from "@/game/events/MovementEvent";

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
