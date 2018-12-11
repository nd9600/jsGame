import { SetPlayerBoardStatusToFinishedEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import { Players } from "@/core/@typings/GameStateTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";
import PlayerBuilder from "@/core/player/PlayerBuilder";

export default class SetPlayerBoardStatusToFinishedEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "SetPlayerBoardStatusToFinishedEvent";
    public data: SetPlayerBoardStatusToFinishedEventData;

    constructor(setPlayerBoardStatusToFinishedEventData: SetPlayerBoardStatusToFinishedEventData) {
        super(setPlayerBoardStatusToFinishedEventData);
        this.types = R.append(this.type, this.types);
        this.data = setPlayerBoardStatusToFinishedEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldPlayerBoard = gameState.getPlayerBoard(this.data.playerID, this.data.boardID);
        let newGameState = gameState.replacePlayerBoard(PlayerBoardBuilder.mergeWithOptions(oldPlayerBoard, {
            boardStatus: PlayerBoardStatus.Finished
        }));

        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        let allPlayerBoardsFinished = true;
        for (const player of R.values(newGameState.players)) {
            const playerBoardsForThisPlayer = R.prop(player.id, newGameState.playerBoards);
            for (const playerBoard of R.values(playerBoardsForThisPlayer)) {
                if (playerBoard.boardStatus !== PlayerBoardStatus.Finished) {
                    allPlayerBoardsFinished = false;
                }
            }
        }

        if (allPlayerBoardsFinished) {
            const playerIDs = R.keys(newGameState.players);

            // get players
            // for each board
                // get if creator finished board and if opponent finished board
                    // if creator completed maze & opponent didn't, creator gets 10 points, opponent 0
                        // replace creator in players with incremented score
            // etc

            for (const board of R.values(newGameState.boards)) {
                const creatorID = board.creatorID;
                const opponentID = Number(R.difference(playerIDs, [String(creatorID)])[0]);

                // throw new Error(JSON.stringify(newGameState.playerBoards));

                const creatorFinishedBoard = newGameState.getPlayerBoard(creatorID, board.id).characterPosition === board.endPoint;
                const opponentFinishedBoard = newGameState.getPlayerBoard(opponentID, board.id).characterPosition === board.endPoint;

                const addedCreatorScore = creatorFinishedBoard && (! opponentFinishedBoard)
                    ? 10
                    : creatorFinishedBoard && opponentFinishedBoard
                        ? 5
                        : 0;

                if (addedCreatorScore > 0) {
                    console.log(`hello creator ${creatorID}`);

                    const oldCreator = R.prop(creatorID, newGameState.players);
                    newGameState = newGameState.replacePlayer(PlayerBuilder.mergeWithOptions(oldCreator, {
                        score: oldCreator.score + addedCreatorScore
                    }));
                }

                const addedOpponentScore = creatorFinishedBoard && opponentFinishedBoard
                    ? 5
                    : (! creatorFinishedBoard) && opponentFinishedBoard
                        ? 20
                        : 0;

                if (addedOpponentScore > 0) {
                    console.log(`hello opponent ${opponentID}`);

                    const oldOpponent = R.prop(opponentID, newGameState.players);
                    newGameState = newGameState.replacePlayer(PlayerBuilder.mergeWithOptions(oldOpponent, {
                        score: oldOpponent.score + addedOpponentScore
                    }));
                }
            }
        }

        return newGameState;
    }
}
