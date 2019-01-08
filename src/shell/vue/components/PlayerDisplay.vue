<template>
    <div class="bg-grey-lighter border border-grey m-4 p-4">
        <p class="whitespace-pre-line font-sans text-left ">{{ gameState.getCurrentInfo() }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameState from '@/core/GameState';

export default Vue.extend({
    name: "PlayerDisplay",
    props: {
        player_id: {
            required: true,
            type: Number
        },
        gameState: {
            required: true,
            type: GameState
        }
    }
})
</script>
