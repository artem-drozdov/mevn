<template>
    <div class="user-page">
        <div class="block-form" :class="{ open: formIsOpen }">
            <post-form />
        </div>
        <button @click="openForm" class="btn-open-form">
            {{ formIsOpen ? "Close" : "Open" }} Post Creator
        </button>
        <div class="users-post">
            <p class="title">
                Here shows all your <span class="brand-color">posts</span>
            </p>
            <div class="posts-block">
                <post-card v-for="post in posts" :post="post" :key="post._id" />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from "../components/home-page/PostCard.vue";
import PostForm from "../components/user-page/PostForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "UserPage",

    components: { PostForm, PostCard },

    data() {
        return {
            loading: false,
            formIsOpen: false,
        };
    },

    computed: {
        ...mapGetters({
            posts: "post/getUserPosts",
        }),
    },

    methods: {
        ...mapActions({
            getUserPosts: "post/getUserPosts",
        }),

        openForm() {
            this.formIsOpen = !this.formIsOpen;
        },
    },

    async mounted() {
        await this.getUserPosts();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.brand-color {
    @include linear-background-brand;
}

.user-page {
    .btn-open-form {
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        margin-top: 30px;
        padding: 6px 16px;
        color: $card-color;
        transition: 0.3s;
        background: linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%);
        border-radius: 6px;

        @media screen and (max-width: 760px) {
            font-size: 14px;
            line-height: 16px;
        }

        &:hover {
            color: $main-color;
            -webkit-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            -moz-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
        }
    }

    .block-form {
        height: 0px;
        opacity: 0;
        overflow: hidden;
        transition: all 0.5s;

        &.open {
            height: 424px;
            opacity: 1;

            @media screen and (max-width: 760px) {
                height: 600px;
            }
        }
    }

    .users-post {
        margin-top: 60px;
        padding-top: 20px;
        border-top: 1px solid #fff;

        @media screen and (max-width: 760px) {
            margin-top: 30px;
        }

        .title {
            @include title-home-page;
        }

        .posts-block {
            @include posts-grid-block;
        }
    }
}
</style>
