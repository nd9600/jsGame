import { BoardPosition, Place, twoNumbers } from "@/core/@typings/BoardTypes";
import { Command } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent } from "@/core/@typings/EventTypes";
import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import Board from "@/core/board/Board";
import EventRunner from "@/core/events/EventRunner";
import GameStateFactory from "@/core/factories/GameStateFactory";
import PlayerBoard from "@/core/player/PlayerBoard";
import TestSetup from "@/shell/TestSetup";

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
        const player0 = GameStateFactory.defaultPlayer();
        const player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        const listOfEventObjects: DispatchedEvent[] = [
            {
                type: "InitialSetupEvent",
                data: {
                    initialPlayerName: "x",
                    size: [4, 4],
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 3, y: 3 },
                    playerIDs: [player0.id, player1.id], 
                    boardIDs: [board0.id, board1.id]
                }
            },
            { type: "InputEvent", data: {command: Command.MoveDown, player: player0} },
            { type: "InputEvent", data: {command: Command.MoveRight, player: player0} }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents);

        const finalPlayerBoard = finalState.getPlayerBoard(player0.id, board0.id);
        const wantedPlayerBoard =  new PlayerBoard(player0.id, board0.id, {x: 3, y: 3}, PlayerBoardStatus.Solved);
        expect(wantedPlayerBoard).toEqual(finalPlayerBoard);
    });

    it("applies_a_list_of_events_with_an_initial_gameState", () => {
        const initialBoardData = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        const player0 = GameStateFactory.defaultPlayer();
        const initialBoard = new Board(
            Board.idCounter++, 
            player0.id,
            initialBoardData, 
            { x: 0, y: 0 }, 
            { x: 3, y: 3 }
        );
        const initialState = GameStateFactory.createGameState({players: [player0], boards: [initialBoard]});
        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InputEvent", data: {command: Command.MoveDown, player: player0} },
            { type: "InputEvent", data: {command: Command.MoveRight, player: player0} }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents, initialState);
        const finalPlayerBoard = finalState.getPlayerBoard(player0.id, initialBoard.id);
        const wantedPlayerBoard = new PlayerBoard(player0.id, initialBoard.id, {x: 3, y: 3}, PlayerBoardStatus.Solved);
        expect(wantedPlayerBoard).toEqual(finalPlayerBoard);
    });
});
