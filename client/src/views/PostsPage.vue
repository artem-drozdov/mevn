<template>
    <div class="posts-page">
        <div class="title-block">
            <h1 class="title">All Posts</h1>
            <p class="description">
                Here you can see all public posts published on this site.
            </p>
        </div>
        <block-create-post class="mt-20" />
        <div v-if="loading && !posts.length" class="centered-block">
            <loader :isActive="loading" />
        </div>
        <div v-else class="posts-block">
            <post-card v-for="post in posts" :key="post._id" :post="post" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import BlockCreatePost from "../components/common/BlockCreatePost.vue";
import Loader from "../components/common/Loader.vue";
import PostCard from "../components/home-page/PostCard.vue";

export default {
    name: "PostsPage",

    components: { PostCard, BlockCreatePost, Loader },

    data() {
        return {
            loading: true,
        };
    },

    computed: {
        ...mapGetters({
            posts: "post/getPosts",
        }),
    },

    methods: {
        ...mapActions({
            getPosts: "post/getPosts",
        }),

        ...mapMutations({
            setPosts: "post/setPosts",
        }),
    },

    beforeRouteLeave(from, to, next) {
        this.setPosts([]);
        next();
    },

    async mounted() {
        try {
            await this.getPosts();
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.posts-page {
    width: 100%;

    .mt-20 {
        margin-top: 20px;
    }

    .title-block {
        margin-top: 60px;
        text-align: center;

        @media screen and (max-width: 560px) {
            margin-top: 20px;
        }

        .title {
            font-weight: 700;
            font-size: 36px;
            line-height: 48px;
            color: $text-color-light;

            @media screen and (max-width: 560px) {
                font-size: 24px;
                line-height: 26px;
            }
        }

        .description {
            font-weight: 400;
            font-size: 18px;
            line-height: 20px;
            margin-top: 25px;
            color: $text-color;

            @media screen and (max-width: 560px) {
                font-size: 14px;
                line-height: 26px;
                margin-top: 12px;
            }
        }
    }

    .posts-block {
        @include posts-grid-block;
    }
    .centered-block {
        display: flex;
        justify-content: center;
        margin-top: 60px;
    }
}
</style>
