<template>
    <div class="max-w-full mt-8">
        <p>{{ boardText }}</p>
        <div class="flex flex-col mt-2" style="height: 40vh;">
            <div
                class="flex flex-row flex-grow"
                v-for="(row, y) in board.boardData"
                :key="y"
            >
                <div
                    class="flex flex-col flex-grow border border-grey-light"
                     :class="getClassesForPosition(x, y)"
                    v-for="(position, x) in row"
                    :key="x"
                    @click="toggleWall(x, y)"
                >
                </div>
            </div>
        </div>

        <p
            v-if="false"
            class="whitespace-pre-line font-sans text-left"
        >
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
import PlayerBoard from '@/core/player/PlayerBoard';
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
        },
        playerBoard(): PlayerBoard {
            return this.gameState.playerBoards[this.player_id][this.board_id];
        },
        isPlacingWalls(): boolean {
            return this.gameState.status === 'PlacingWalls';
        },
        boardText(): string {
            return this.board.creatorID === this.player_id
                ? "Your board"
                : "Opponent's board";
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
            return R.equals(Place.Wall, this.board.getPosition({x, y}));
        },
        isCharacterPosition(x: number, y: number): boolean {
            return R.equals(this.playerBoard.characterPosition, {x, y});
        },
        getClassesForPosition(x: number, y: number) {
            let classObject = {
                'cursor-pointer': this.isPlacingWalls
            };
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
            } else if (this.isCharacterPosition(x, y)) {
                classObject = R.merge(classObject, {
                    "bg-yellow": true,
                    "hover:bg-yellow-dark": true
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
            
            return classObject;
        },
        toggleWall(x: number, y: number): void {
            if (this.gameState.status !== Status.PlacingWalls) {
                return;
            }
            const position: BoardPosition = {x, y};
            const toggleWallEvent = new ToggleWallEvent({boardID: this.board_id, positionToToggle: position});

            this.eventBus.dispatchToAllListeners(toggleWallEvent);
        }
    }
})
</script>
