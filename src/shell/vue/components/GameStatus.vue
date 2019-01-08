<template>
    <div>
        <p>Game status: {{gameState.status}}</p>

        <p 
            v-for="(player, index) in players"
            :key="index"
        >
            {{player.name}}: {{player.score}} points
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as R from "ramda";

import GameState from '@/core/GameState';
import Player from '@/core/player/Player';

export default Vue.extend({
    name: "GameStatus",
    props: {
        gameState: {
            required: true,
            type: GameState
        }
    },
    computed: {
        players() : Player[] {
            return R.values(this.gameState.players);
        }
    }
})
</script>
