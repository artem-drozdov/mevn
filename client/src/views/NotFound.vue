<template>
    <div class="page-not-found">
        <div class="align-center">
            <h1 class="not-found">Page not found</h1>
            <router-link class="link-home" to="/">Home page</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.page-not-found {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .align-center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .not-found {
        font-size: 54px;
        line-height: 60px;
        font-weight: 600;
        letter-spacing: 0.2px;
        margin-bottom: 20px;
        color: $brand-color;
    }

    .link-home {
        display: block;
        width: max-content;
        font-size: 20px;
        line-height: 22px;
        padding: 10px 26px;
        color: $light-blue;
        border: 1px solid $brand-color;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>
