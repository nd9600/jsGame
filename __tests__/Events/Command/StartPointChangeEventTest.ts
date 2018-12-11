import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("StartPointChangeEvent", () => {

    it("handles_changing_start_point", () => {
        const gameState = GameStateFactory.createGameState({
            players: [GameStateFactory.defaultPlayer(), GameStateFactory.defaultPlayer()],
            boards: [GameStateFactory.defaultBoard(), GameStateFactory.defaultBoard()],
        });

        const board0 = R.values(gameState.boards)[0];
        const board1 = R.values(gameState.boards)[1];

        const board0ID = board0.id;
        const newStartPoint = {x: 1, y: 1};
        const startPointChangeEvent = new StartPointChangeEvent({boardID: board0ID, newStartPoint});

        const newGameState = startPointChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.startPoint).toEqual(newStartPoint);

        for (const player of R.values(newGameState.players)) {
            const playerBoardsForThisPlayer = R.prop(player.id, newGameState.playerBoards);
            for (const playerBoard of R.values(playerBoardsForThisPlayer)) {
                if (R.equals(playerBoard.boardID, board0ID)) {
                    expect(playerBoard.characterPosition).toEqual(newStartPoint);
                } else {
                    expect(playerBoard.characterPosition).toEqual(board1.startPoint);
                }
            }
        }
    });
});
