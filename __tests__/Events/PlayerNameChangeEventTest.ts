import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

describe("PlayerNameChangeEvent", () => {

    it("handles_changing_player_name", () => {
        const gameState = usefulFunctions.makeNewGameState();
        const board = R.values(gameState.boards)[0];

        const boardID = board.id;
        const newPlayerName = "abcdef";
        const playerNameChangeEvent = new PlayerNameChangeEvent({boardID, newPlayerName});

        const newGameState = playerNameChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.player).toEqual(newPlayerName);
    });
});
