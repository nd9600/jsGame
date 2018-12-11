import { Command, Direction } from "@/core/@typings/EventDataTypes";
import InputEvent from "@/core/events/Game/InputEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";

describe("InputEvent", () => {
    it("handles_moving_up", () => {
        const command = Command.MoveUp;
        const player = GameStateFactory.defaultPlayer;
        const inputEvent = new InputEvent({command, player});
        const commandEvent = inputEvent.createEvent();
        expect(commandEvent.data.direction).toEqual(Direction.Up);
    });

    it("handles_moving_left", () => {
        const command = Command.MoveLeft;
        const player = GameStateFactory.defaultPlayer;
        const inputEvent = new InputEvent({command, player});
        const commandEvent = inputEvent.createEvent();
        expect(commandEvent.data.direction).toEqual(Direction.Left);
    });

    it("handles_moving_right", () => {
        const command = Command.MoveRight;
        const player = GameStateFactory.defaultPlayer;
        const inputEvent = new InputEvent({command, player});
        const commandEvent = inputEvent.createEvent();
        expect(commandEvent.data.direction).toEqual(Direction.Right);
    });
});
