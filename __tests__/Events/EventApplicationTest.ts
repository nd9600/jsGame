import { BoardPosition, Place, twoNumbers } from "@/core/@typings/BoardTypes";
import { Command } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent } from "@/core/@typings/EventTypes";
import Board from "@/core/board/Board";
import EventRunner from "@/core/events/EventRunner";
import GameStateFactory from "@/core/factories/GameStateFactory";
import GameState from "@/core/GameState";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";

describe("EventApplication", () => {
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

    it("applies_a_list_of_events", () => {
        const listOfEventObjects: DispatchedEvent[] = [
            {
                type: "InitialSetupEvent",
                data: {
                    initialPlayerName: "x",
                    size: [4, 4],
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 3, y: 3 }
                }
            },
            { type: "InputEvent", data: {command: Command.MoveDown, player: GameStateFactory.defaultPlayer} },
            { type: "InputEvent", data: {command: Command.MoveRight, player: GameStateFactory.defaultPlayer} }
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
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });

    it("applies_a_list_of_events_with_an_initial_gameState", () => {
        const initialBoardData = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        const initialBoard = new Board(
            Board.idCounter++, 
            -1,
            initialBoardData, 
            { x: 0, y: 0 }, 
            { x: 3, y: 3 }
        );
        const initialState = GameStateFactory.makeNewGameState({boards: [initialBoard]});
        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InputEvent", data: {command: Command.MoveDown, player: GameStateFactory.defaultPlayer} },
            { type: "InputEvent", data: {command: Command.MoveRight, player: GameStateFactory.defaultPlayer} }
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
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });
});
