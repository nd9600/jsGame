import Board from "@/core/board/Board";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import GameState from "@/core/GameState";
import { BoardType, Direction, Place, Position } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

describe("DirectionEvent", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

    it("handles_direction_event", () => {
        const board1Data: BoardType = [ [Place.Empty], [Place.Character], [Place.Empty], [Place.Empty], [Place.Empty] ];
        const characterPosition1: Position = {x: 0, y: 1};

        const board2Data: BoardType = [ [Place.Empty], [Place.Empty], [Place.Empty], [Place.Character], [Place.Empty] ];
        const characterPosition2: Position = {x: 0, y: 3};

        const board1 = new Board(Board.idCounter++, "", board1Data, characterPosition1, endPoint);
        const board2 = new Board(Board.idCounter++, "", board2Data, characterPosition2, endPoint);
        let gameState = new GameState (
            usefulFunctions.makeBoardsObject([board1, board2])
        );

        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        const directionEvent = new DirectionEvent(Direction.Down);
        gameState = directionEvent.handle(gameState);
        R.forEach((newBoard: Board) => {
            expect(newBoard.characterPosition).toEqual(expectedCharacterPosition);
        }, R.values(gameState.boards));        
    });
});
