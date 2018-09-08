import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import { PlayerNameChangeEventData } from "@/core/myTypes";

import * as R from "ramda";
import BoardBuilder from "@/core/board/BoardBuilder";

export default class PlayerNameChangeEvent extends CommandEvent {
    public type = "PlayerNameChangeEvent";
    public data: PlayerNameChangeEventData;

    constructor(playerNameChangeEventData: PlayerNameChangeEventData) {
        super(playerNameChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = playerNameChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, {player: this.data.newPlayerName});
        return gameState.replaceBoard(newBoard);
    }
}
