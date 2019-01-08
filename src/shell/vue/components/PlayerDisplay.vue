<template>
    <div class="bg-grey-lightest border border-grey m-4 p-4">
        <!-- <p class="whitespace-pre-line font-sans text-left ">{{ gameState.getCurrentInfo() }}</p> -->
        <player-board-display
            v-for="board in boards"
            v-if="shouldShowBoard(board.id)"
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
        boards() : Board[] {
            return R.values(this.gameState.boards);
        }
    },
    methods: {
        shouldShowBoard(boardID: number): boolean {
            if (this.gameState.status !== Status.NotStarted) {
                return true;
            }
            return this.gameState.boards[boardID].creatorID === this.player_id;
        }
    }
})
</script>
