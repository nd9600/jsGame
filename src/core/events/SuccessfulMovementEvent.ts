import * as R from "ramda";
import { Place, Position } from "@/core/myTypes";
import MovementEvent from "@/core/events/MovementEvent";
import GameState from "@/core/GameState";

export default class SuccessfulMovementEvent extends MovementEvent {

    public data: Position;
    constructor(newCharacterPosition: Position) {
        super();
        this.data = newCharacterPosition;
    }

    public handle(state: GameState) {
        const {characterPosition, board} = state;

        const newBoard = board
            .setPosition(characterPosition, Place.Empty)
            .setPosition(this.data, Place.Character);

        return new GameState(this.data, newBoard);
    }
}
