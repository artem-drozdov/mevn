<template>
    <section class="home-page">
        <introductory-block />
        <recent-projects-block />
        <latest-posts />
        <subscribe-block />
    </section>
</template>

<script>
import IntroductoryBlock from "../components/home-page/IntroductoryBlock.vue";
import RecentProjectsBlock from "../components/home-page/RecentProjectsBlock.vue";
import LatestPosts from "../components/home-page/LatestPosts.vue";
import SubscribeBlock from "../components/common/SubscribeBlock.vue";

export default {
    name: "Home",

    components: {
        IntroductoryBlock,
        RecentProjectsBlock,
        LatestPosts,
        SubscribeBlock,
    },

    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.home-page {
    margin-top: 80px;

    @media screen and (max-width: 760px) {
        margin-top: 40px;
    }
}
</style>
