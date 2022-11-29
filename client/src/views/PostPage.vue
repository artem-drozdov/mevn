<template>
    <div v-if="currentPost" class="page-post">
        <modal
            v-if="isUserPost"
            :isOpen="isEditPost"
            @closeModal="editModalPost"
        >
            <post-form :isChangePost="true" @formSubmitted="editModalPost" />
        </modal>
        <modal
            v-if="isUserPost"
            :autoSizeContent="true"
            :hasCloseButton="false"
            :isOpen="isDeletePostClicked"
            @closeModal="handleDeletePost(false)"
        >
            <confirm-delete
                @click-cancel="handleDeletePost(false)"
                @click-confirm="handleConfirmDelete"
            />
        </modal>
        <div class="text-center">
            <div class="title">
                {{ currentPost.title }}
                <div class="flex-align">
                    <div v-if="currentPost.hidden" class="post-label red">
                        <span>Hidden</span>
                    </div>
                    <div v-if="!currentPost.image" class="post-label green">
                        <span>Default image</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-published-block">
            <p class="info">
                By {{ currentPost.author.username }} on
                {{ currentPost.createdAt | moment("DD MMM YYYY") }}
            </p>
            <div v-if="isUserPost" class="block-control-buttons">
                <button @click="editModalPost" class="btn-edit-post">
                    <icon-edit />
                </button>
                <button
                    @click.stop="handleDeletePost(true)"
                    class="btn-delete-post"
                >
                    <icon-delete />
                </button>
            </div>
        </div>
        <div class="image-post-block">
            <img
                v-if="currentPost.image"
                :src="currentPost.image"
                :alt="'image for' + currentPost.title + 'post'"
            />
            <img
                v-else
                src="@/assets/images/card/emptyBlog.jpg"
                :alt="'image for' + currentPost.title + 'post'"
            />
        </div>
        <div class="content-block">
            <p class="title">{{ currentPost.title }}</p>
            <p class="description">{{ currentPost.description }}</p>
        </div>
        <subscribe-block :class="'mt-100'" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import SubscribeBlock from "../components/common/SubscribeBlock.vue";
import Modal from "../components/modal/Modal.vue";
import IconDelete from "../components/svg/IconDelete.vue";
import IconEdit from "../components/svg/IconEdit.vue";
import PostForm from "../components/user-page/PostForm.vue";
import ConfirmDelete from "../components/modal/content/ConfirmDelete.vue";

export default {
    name: "PostPage",

    components: {
        SubscribeBlock,
        Modal,
        PostForm,
        IconEdit,
        IconDelete,
        ConfirmDelete,
    },

    data() {
        return {
            postId: null,
            isEditPost: false,
            isDeletePostClicked: false,
        };
    },

    computed: {
        ...mapGetters({
            currentPost: "post/getCurrentPost",
            currentUser: "auth/getUser",
        }),

        isUserPost() {
            return this.currentUser?.id === this.currentPost.author._id;
        },
    },

    methods: {
        ...mapActions({
            getCurrentPost: "post/getCurrentPost",
            deletePost: "post/deletePost",
        }),

        ...mapMutations({
            setCurrentPost: "post/setCurrentPost",
        }),

        editModalPost() {
            this.isEditPost = !this.isEditPost;
        },

        handleDeletePost(value) {
            this.isDeletePostClicked = value;
        },

        async handleConfirmDelete() {
            const { _id: postId } = this.currentPost;

            await this.deletePost(postId);

            this.handleDeletePost(false);
            this.$router.go(-1);
        },
    },

    beforeRouteEnter(from, to, next) {
        next((vm) => {
            vm.postId = from.params.postId;
        });
    },

    beforeDestroy() {
        this.setCurrentPost(null);
    },

    watch: {
        isEditPost(val) {
            const body = document.querySelector("body");

            if (val) {
                body.style.overflow = "hidden";
            } else {
                body.style.overflow = "auto";
            }
        },
    },

    async mounted() {
        await this.getCurrentPost(this.postId);

        if (!this.currentPost) {
            this.$router.push("/");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.page-post {
    padding-top: 50px;

    @media screen and (max-width: 560px) {
        padding-top: 20px;
    }

    .mt-100 {
        margin-top: 100px;

        @media screen and (max-width: 560px) {
            margin-top: 40px;
        }
    }

    .content-block {
        width: 90%;
        margin: 0 auto;

        .title {
            font-weight: 700;
            font-size: 28px;
            line-height: 30px;
            margin-bottom: 20px;
            color: $text-color-light;

            @media screen and (max-width: 960px) {
                font-size: 24px;
                line-height: 26px;
            }

            @media screen and (max-width: 700px) {
                font-size: 20px;
                line-height: 22px;
            }
        }

        .description {
            font-weight: 500;
            font-size: 26px;
            line-height: 46px;
            color: $text-color-light;

            @media screen and (max-width: 960px) {
                font-size: 20px;
                line-height: 34px;
            }

            @media screen and (max-width: 700px) {
                font-size: 16px;
                line-height: 28px;
            }
        }
    }

    .image-post-block {
        width: 100%;
        height: 600px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 80px;

        @media screen and (max-width: 960px) {
            height: 500px;
        }

        @media screen and (max-width: 700px) {
            height: 400px;
            margin-bottom: 40px;
        }

        @media screen and (max-width: 560px) {
            height: 300px;
            margin-bottom: 30px;
        }

        @media screen and (max-width: 420px) {
            height: 250px;
            margin-bottom: 30px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    .flex-align {
        display: flex;
        align-items: center;
    }

    .info-published-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 40px 0 30px 0;
        padding: 0 10px;

        @media screen and (max-width: 700px) {
            margin: 30px 0 20px 0;
        }

        .block-control-buttons {
            display: flex;
            align-items: center;

            .btn-edit-post {
                margin-right: 12px;
                padding-bottom: 3px;
            }
        }

        .info {
            font-weight: 400;
            font-size: 18px;
            line-height: 20px;
            color: $text-gray-color;

            @media screen and (max-width: 700px) {
                font-size: 16px;
                line-height: 18px;
            }
        }
    }

    .title {
        font-weight: 700;
        font-size: 36px;
        line-height: 38px;
        color: $text-color-light;

        @media screen and (max-width: 700px) {
            font-size: 28px;
            line-height: 30px;
        }

        .post-label {
            display: block;
            width: max-content;
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            padding: 8px;
            margin-top: 10px;
            border-radius: 10px;

            &:not(:last-child) {
                margin-right: 12px;
            }

            &.green {
                background: linear-gradient(
                    180deg,
                    rgba(16, 185, 129, 0.2) 0%,
                    rgba(190, 242, 100, 0.2) 100%
                );

                span {
                    background: linear-gradient(
                        180deg,
                        #10b981 0%,
                        #bef264 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            }

            &.red {
                background: linear-gradient(
                    180deg,
                    rgba(220, 38, 38, 0.2) 0%,
                    rgba(249, 115, 22, 0.2) 100%
                );

                span {
                    background: linear-gradient(
                        180deg,
                        #dc2626 0%,
                        #f97316 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            }

            &.blue {
                background: linear-gradient(
                    180deg,
                    rgba(124, 58, 237, 0.2) 0%,
                    rgba(96, 165, 250, 0.2) 100%
                );

                span {
                    background: linear-gradient(
                        180deg,
                        #7c3aed 0%,
                        #60a5fa 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            }
        }
    }

    .text-center {
        display: flex;
        justify-content: center;
    }
}
</style>
