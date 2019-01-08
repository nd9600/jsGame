<template>
    <div class="">
        <p class="whitespace-pre-line font-sans text-left ">{{ board.getCurrentInfo() }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as R from "ramda";

import GameState from '@/core/GameState';
import Board from '@/core/board/Board';

export default Vue.extend({
    name: "PlayerBoardDisplay",
    props: {
        gameState: {
            required: true,
            type: GameState
        },
        player_id: {
            required: true,
            type: Number
        },
        board_id: {
            required: true,
            type: Number
        },
    },
    computed: {
        board() : Board {
            return this.gameState.boards[this.board_id];
        }
    }
})
</script>
