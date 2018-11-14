import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import PlayerBuilder from "@/core/player/PlayerBuilder";
import * as R from "ramda";
export default class PlayerNameChangeEvent extends CommandEvent {
    constructor(playerNameChangeEventData) {
        super(playerNameChangeEventData);
        this.type = "PlayerNameChangeEvent";
        this.types = R.append(this.type, this.types);
        this.data = playerNameChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        const oldPlayer = gameState.players[this.data.playerID];
        const newBoard = PlayerBuilder.mergeWithOptions(oldPlayer, { name: this.data.newPlayerName });
        return gameState.replacePlayer(oldPlayer);
    }
}
//# sourceMappingURL=PlayerNameChangeEvent.js.map