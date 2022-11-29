<template>
    <div class="auth-layout">
        <div class="wrapper">
            <div class="content-block">
                <div class="title-block">
                    <router-link to="/">
                        <div class="main-link-app">
                            <icon-brand />
                            <p class="app-name">Your Blog</p>
                        </div>
                    </router-link>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconBrand from "../components/svg/IconBrand.vue";
export default {
    components: { IconBrand },
    name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.auth-layout {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .title-block {
        width: fit-content;
        margin-bottom: 50px;

        @media screen and (max-width: 560px) {
            margin-bottom: 30px;
        }
    }

    .wrapper {
        width: 50%;
        max-width: 600px;

        @media screen and (max-width: 960px) {
            width: 70%;
        }

        @media screen and (max-width: 560px) {
            width: 90%;
        }
    }

    .content-block {
        width: 100%;
        padding: 26px;
        border-style: solid;
        background: linear-gradient(#0f172a, #0f172a) padding-box,
            linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%) border-box;
        border: 2px solid transparent;
        border-radius: 6px;

        @include main-link-app;
    }
}
</style>
