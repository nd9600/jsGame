import Board from "@/core/board/Board";
import EventRunner from "@/core/events/EventRunner";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";
import { Place } from "@/core/@typings/BoardTypes";
import { Command } from "@/core/@typings/EventDataTypes";
describe("EventApplication", () => {
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
    it("applies_a_list_of_events", () => {
        const listOfEventObjects = [
            {
                type: "InitialSetupEvent",
                data: {
                    initialPlayerName: "x",
                    size: [4, 4],
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 3, y: 3 }
                }
            },
            { type: "InputEvent", data: Command.MoveDown },
            { type: "InputEvent", data: Command.MoveRight }
        ];
        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents);
        const wantedBoard = [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Character]
        ];
        const finalBoard = R.values(finalState.boards)[0];
        expect(finalBoard.boardSolved).toEqual(true);
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });
    it("applies_a_list_of_events_with_an_initial_gameState", () => {
        const initialBoardData = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        const initialBoard = new Board(Board.idCounter++, "", initialBoardData, { x: 0, y: 0 }, { x: 3, y: 3 });
        const initialState = new GameState(usefulFunctions.makeBoardsObject([initialBoard]));
        const listOfEventObjects = [
            { type: "InputEvent", data: Command.MoveDown },
            { type: "InputEvent", data: Command.MoveRight }
        ];
        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents, initialState);
        const wantedBoard = [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Character]
        ];
        const finalBoard = R.values(finalState.boards)[0];
        expect(finalBoard.boardSolved).toEqual(true);
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });
});
//# sourceMappingURL=EventApplicationTest.js.map