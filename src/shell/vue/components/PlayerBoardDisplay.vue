<template>
    <div class="max-w-full">
        <div class="flex flex-col" style="height: 66vh;">
            <div
                class="flex flex-row flex-grow"
                v-for="(row, y)  in board.boardData"
                :key="y"
            >
                <div
                    class="flex flex-col flex-grow cursor-pointer border border-grey-light hover:bg-grey-light"
                    v-for="(position, x)  in row"
                    :key="x"
                >
                    <span
                        v-if="isStartPoint(x, y)"
                        class="h-full w-full p-2 bg-blue hover:bg-blue-dark"
                        @click="toggleWall(x, y)"
                    >
                        
                    </span>
                    <span
                        v-else-if="isEndPoint(x, y)"
                        class="h-full w-full p-2 bg-green hover:bg-green-dark"
                        @click="toggleWall(x, y)"
                    >
                        
                    </span>
                    <span
                        v-else
                        class="h-full w-full p-2"
                        @click="toggleWall(x, y)"
                    >
                        {{position}}
                    </span>
                </div>
            </div>
        </div>

        <p class="whitespace-pre-line font-sans text-left">
            {{ board.getCurrentInfo() }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as R from "ramda";

import GameState from '@/core/GameState';
import Board from '@/core/board/Board';
import { BoardPosition } from '@/core/@typings/BoardTypes';

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
        board(): Board {
            return this.gameState.boards[this.board_id];
        }
    },
    methods: {
        isStartPoint(x: number, y: number): boolean {
            return R.equals({x, y}, this.board.startPoint);
        },
        isEndPoint(x: number, y: number): boolean {
            return R.equals({x, y}, this.board.endPoint);
        },
        toggleWall(x: number, y: number): void {
            const position: BoardPosition = {x, y};
            console.log(position);

            // won't work, the $root is in game.ts, not Game.vue - use the eventbus instead
            // (this.$root as any).toggleWall(this.board_id, position);
        }
    }
})
</script>
