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
    beforeEach(() => {
        const setup = new TestSetup();
        [initialPlayerName, size, startPoint, endPoint] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint()
        ];
    });

    it("creates_initial_game", () => {
        const initialGameSetupData = { initialPlayerName, size, startPoint, endPoint };
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        const gameState = initialSetupEvent.handle(
            GameStateFactory.makeNewGameState()
        );
        const wantedBoard = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        
        const board = R.values(gameState.boards)[0];
        expect(board.boardData).toEqual(wantedBoard);
    });
});

