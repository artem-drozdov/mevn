<template>
    <div id="app" class="app">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {};
    },

    computed: {
        ...mapState({
            loggedIn: (state) => state.auth.status.loggedIn,
        }),

        layout() {
            return this.$route.meta.layout || "default-layout";
        },
    },

    methods: {
        ...mapActions({
            getUser: "auth/getUser",
        }),
    },

    async mounted() {
        if (this.loggedIn) {
            await this.getUser();
        }
    },
};
</script>

<style scoped lang="scss">
.app {
    width: 100%;
    min-height: 100%;
}

.content-section {
    width: 100%;

    @media screen and (max-width: 900px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 560px) {
        height: calc(100% - 50px);
        max-height: calc(100% - 50px);
        padding: 0 12px;
    }
}
</style>

<style lang="scss">
@import "@/assets/fonts/roboto.scss";
@import "@/assets/scss/_variables.scss";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
    min-height: 100%;
    font-family: "Roboto";
    background-color: $main-color;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #999999;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-button {
        display: none;
    }
}

button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}

a {
    color: #333333;
    text-decoration: none;
}

input,
textarea {
    border: none;
    outline: none;
    background: transparent;
    font-family: "Roboto";
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 100px;
}
</style>
