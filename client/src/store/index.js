import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth.module";
import { post } from "./post.module";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
    },
    getters: {
        getCount(state) {
            return state.count;
        },
    },
    mutations: {
        increment(state) {
            state.count++;
        },

        decrement(state) {
            state.count--;
        },
    },
    actions: {},
    modules: {
        auth,
        post,
    },
});
