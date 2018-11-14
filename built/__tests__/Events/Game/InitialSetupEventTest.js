import { Place } from "@/core/@typings/BoardTypes";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import usefulFunctions from "@/core/usefulFunctions";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";
describe("InitialSetupEventTest", () => {
    let size;
    let startPoint;
    let endPoint;
    let initialPlayerName;
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
        const gameState = initialSetupEvent.handle(usefulFunctions.makeNewGameState());
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
//# sourceMappingURL=InitialSetupEventTest.js.map