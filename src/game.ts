import Vue from "vue";
import Game from "@vue/Game.vue";

const game = new Vue({
    el: "#app",
    template: "<game />",
    components: {
        Game
    }
});
