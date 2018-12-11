import { BoardPosition, Place, twoNumbers } from "@/core/@typings/BoardTypes";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";

describe("InitialSetupEventTest", () => {
    let size: twoNumbers;
    let startPoint: BoardPosition;
    let endPoint: BoardPosition;
    let initialPlayerName: string;
    let playerIDs: [number, number];
    let boardIDs: [number, number];
    beforeEach(() => {
        const setup = new TestSetup();
        [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint(),
            setup.getPlayerIDs(),
            setup.getBoardIDs(),
        ];
    });

    it("creates_initial_game", () => {
        const initialGameSetupData = { initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs };
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        const gameState = initialSetupEvent.handle(
            GameStateFactory.createGameState()
        );
        const wantedBoard = [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty]
        ];
        
        const board = R.values(gameState.boards)[0];
        expect(board.boardData).toEqual(wantedBoard);
    });
});

