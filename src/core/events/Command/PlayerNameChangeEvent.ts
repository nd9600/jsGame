import { PlayerNameChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import PlayerBuilder from "@/core/player/PlayerBuilder";
import * as R from "ramda";

export default class PlayerNameChangeEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "PlayerNameChangeEvent";
    public data: PlayerNameChangeEventData;

    constructor(playerNameChangeEventData: PlayerNameChangeEventData) {
        super(playerNameChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = playerNameChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldPlayer = gameState.players[this.data.playerID];
        const newPlayer = PlayerBuilder.mergeWithOptions(oldPlayer, {name: this.data.newPlayerName});
        return gameState.replacePlayer(newPlayer);
    }
}
