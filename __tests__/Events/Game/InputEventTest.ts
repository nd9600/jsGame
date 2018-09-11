import { Command, Direction } from "@/core/@typings/EventDataTypes";
import InputEvent from "@/core/events/Game/InputEvent";

describe("InputEvent", () => {
    it("handles_moving_up", () => {
        const command = Command.MoveUp;
        const inputEvent = new InputEvent(command);
        const commandEvent = inputEvent.createEvent();
        expect(commandEvent.data).toEqual(Direction.Up);
    });

    it("handles_moving_right", () => {
        const command = Command.MoveRight;
        const inputEvent = new InputEvent(command);
        const commandEvent = inputEvent.createEvent();
        expect(commandEvent.data).toEqual(Direction.Right);
    });
});
