import { Status } from "@/core/@typings/BoardTypes";
import { StartPointChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";

export default class StartPointChangeEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "StartPointChangeEvent";
    public data: StartPointChangeEventData;

    constructor(startPointChangeEventData: StartPointChangeEventData) {
        super(startPointChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = startPointChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        if (gameState.status !== Status.NotStarted) {
            return gameState;
        }

        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = oldBoard.setStartPoint(this.data.newStartPoint);
        let newGameState = gameState
            .replaceBoard(newBoard);

        // we need to change the playerBoards' first character position's too
        for (const player of R.values(newGameState.players)) {
            const playerBoardsForThisPlayer = R.prop(player.id, newGameState.playerBoards);
            for (const playerBoard of R.values(playerBoardsForThisPlayer)) {
                if (R.equals(playerBoard.boardID, this.data.boardID)) {
                    newGameState = newGameState.replacePlayerBoard(PlayerBoardBuilder.mergeWithOptions(playerBoard, {
                        characterPosition: this.data.newStartPoint
                    }));
                }
            }
        }

        return newGameState;
    }
}
