<template>
    <div class="wrapper">
        <p class="text">If you want to create post then go to the user page</p>
        <router-link class="link-to-user-page" to="/user-page">
            Create Post
        </router-link>
    </div>
</template>

<script>
export default {
    name: "BlockCreatePost",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    background: linear-gradient(#0f172a, #0f172a) padding-box,
        linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%) border-box;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 12px;

    @media screen and (max-width: 620px) {
        padding: 8px;
    }

    @media screen and (max-width: 420px) {
        flex-direction: column;
        text-align: center;
    }

    .text {
        font-size: 16px;
        line-height: 18px;
        color: $text-color;

        @media screen and (max-width: 620px) {
            font-size: 12px;
            line-height: 14px;
        }
    }

    .link-to-user-page {
        padding: 8px 12px;
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
        color: $main-color;
        border-radius: 6px;
        background: linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%);

        @media screen and (max-width: 620px) {
            padding: 6px 8px;
            font-size: 12px;
            line-height: 14px;
        }

        @media screen and (max-width: 420px) {
            margin-top: 12px;
        }

        &:hover {
            -webkit-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            -moz-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
        }
    }
}
</style>
