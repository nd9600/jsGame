<template>
    <div class="bg-grey-lightest border border-grey m-4 p-4">
        <!-- <p class="whitespace-pre-line font-sans text-left ">{{ gameState.getCurrentInfo() }}</p> -->
        <player-board-display
            v-for="board in boardsToShow"
            :key="board.id"
            :game-state="gameState"
            :player_id="player_id"
            :board_id="board.id"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as R from "ramda";

import { Status } from '@/core/@typings/BoardTypes';
import GameState from '@/core/GameState';
import Board from '@/core/board/Board';

import PlayerBoardDisplay from "./PlayerBoardDisplay.vue";
export default Vue.extend({
    name: "PlayerDisplay",
    components: {
        PlayerBoardDisplay
    },
    props: {
        gameState: {
            required: true,
            type: GameState
        },
        player_id: {
            required: true,
            type: Number
        }
    },
    computed: {
        // a board should always be shown if the game's been started, or if the player owns the board
        boardsToShow(): Board[] {
            const shouldShowBoard = (board: Board): boolean => {
                if (this.gameState.status === Status.Playing || this.gameState.status === Status.Finished) {
                    return true;
                }
                return this.gameState.boards[board.id].creatorID === this.player_id;
            };
            return R.filter(shouldShowBoard, R.values(this.gameState.boards));
        }
    },
    methods: {
    }
})
</script>
