import { PlayerOptions } from "@/core/@typings/PlayerTypes";
import Player from "./Player";

/**
 * Builds a Player by merging an already-existing Player with any of the possible options
 * You can't change a player's ID after it's been made, so there's no point setting one in PlayerOptions
 */
export default class PlayerBuilder {
    public static mergeWithOptions(player: Player, playerOptions: PlayerOptions): Player {
        return new Player(
            player.id,
            playerOptions.name || player.name,
            playerOptions.score || player.score
        );
    }
}
