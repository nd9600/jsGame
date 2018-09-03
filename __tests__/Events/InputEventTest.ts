import Board from "@/core/board/Board";
import InputEvent from "@/core/events/Game/InputEvent";
import GameState from "@/core/GameState";
import { BoardType, Command, Place, Position } from "@/core/myTypes";

describe("InputEvent", () => {
    let gameState: GameState;
    beforeEach(() => {
        const endPoint = {
            x: 9001,
            y: 9001
        };
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 1
        };

        gameState = new GameState (
            new Board(Board.idCounter++, boardData, characterPosition, endPoint)
        );
    });

    it("handles_moving_up", () => {
        const command = Command.MoveUp;
        const inputEvent = new InputEvent(command);
        const movementEvent = inputEvent.createEvent(command, gameState);
        const expectedPosition = {
            x: 0,
            y: 0
        };
        expect(movementEvent.data.newCharacterPosition).toEqual(expectedPosition);
    });

    it("handles_moving_down", () => {
        const command = Command.MoveDown;
        const inputEvent = new InputEvent(command);
        const movementEvent = inputEvent.createEvent(command, gameState);
        const expectedPosition = {
            x: 0,
            y: 4
        };
        expect(movementEvent.data.newCharacterPosition).toEqual(expectedPosition);
    });
});
