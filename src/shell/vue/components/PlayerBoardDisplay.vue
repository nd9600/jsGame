<template>
    <div class="max-w-full">
        <div class="flex flex-col" style="height: 66vh;">
            <div
                class="flex flex-row flex-grow"
                v-for="(row, y)  in board.boardData"
                :key="y"
            >
                <div
                    class="flex flex-col flex-grow cursor-pointer border border-grey-light"
                    v-for="(position, x)  in row"
                    :key="x"
                >
                    <span
                        class="h-full w-full p-2"
                        :class="getClassesForPosition(x, y)"
                        @click="toggleWall(x, y)"
                    >
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

import { BoardPosition, Place, Status } from '@/core/@typings/BoardTypes';
import GameState from '@/core/GameState';
import Board from '@/core/board/Board';
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";

export default Vue.extend({
    name: "PlayerBoardDisplay",
    inject: ["eventBus"],
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
        isWall(x: number, y: number): boolean {
            console.log(this.board.getPosition({x, y}));
            return R.equals(Place.Wall, this.board.getPosition({x, y}));
        },
        getClassesForPosition(x: number, y: number) {
            let classObject = {};
            if (this.isStartPoint(x, y)) {
                classObject = R.merge(classObject, {
                    "bg-blue": true,
                    "hover:bg-blue-dark": true
                });
            } else if (this.isEndPoint(x, y)) {
                classObject = R.merge(classObject, {
                    "bg-green": true,
                    "hover:bg-green-dark": true
                });
            }  else if (this.isWall(x, y)) {
                classObject = R.merge(classObject, {
                    "bg-red": true,
                    "hover:bg-red-dark": true
                });
            }

            if (this.gameState.status === Status.PlacingWalls) {
                classObject = R.merge(classObject, {
                    "hover:bg-grey-light": true
                });
            }
            
            console.log(x, y, classObject);

            return classObject;
        },
        toggleWall(x: number, y: number): void {
            //if (this.gameState.status !== Status.PlacingWalls) {
            //    return;
            //}
            const position: BoardPosition = {x, y};
            const event = new ToggleWallEvent({boardID: this.board_id, positionToToggle: position});

            this.eventBus.dispatchToAllListeners(event);
        }
    }
})
</script>
