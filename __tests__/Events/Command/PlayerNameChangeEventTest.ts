import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("PlayerNameChangeEvent", () => {

    it("handles_changing_player_name", () => {
        const gameState = GameStateFactory.createGameState();
        const player = R.values(gameState.players)[0];

        const playerID = player.id;
        const newPlayerName = "abcdef";
        const playerNameChangeEvent = new PlayerNameChangeEvent({playerID, newPlayerName});

        const newGameState = playerNameChangeEvent.handle(gameState);
        const newPlayer = R.values(newGameState.players)[0];

        expect(newPlayer.name).toEqual(newPlayerName);
    });
});
