<template>
    <router-link class="link-post" :to="{ path: `post/${post._id}` }">
        <div class="post-card">
            <div v-if="post.hidden" class="ribbon-hidden">
                <span>Hidden</span>
            </div>
            <div class="post-image">
                <img v-if="post.image" :src="post.image" :alt="post.title" />
                <img
                    v-else
                    src="@/assets/images/card/emptyBlog.jpg"
                    :alt="post.title"
                />
            </div>
            <div class="post-data">
                <p class="post-title">{{ post.title }}</p>
                <p class="post-created">
                    {{ post.createdAt | moment("DD-MM-YY, HH:mm:ss") }}
                </p>
                <p class="post-description">{{ post.description }}</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "PostCard",

    props: {
        post: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.post-card {
    position: relative;
    display: block;
    overflow: hidden;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: $card-color;
    transition: 0.2s;

    &:hover {
        -webkit-box-shadow: 0px 0px 15px -2px #3e5479;
        box-shadow: 0px 0px 15px -2px #3e5479;
    }

    @media screen and (max-width: 920px) {
        height: 360px;
    }

    @media screen and (max-width: 470px) {
        height: 280px;
    }

    .ribbon-hidden {
        position: absolute;
        top: 25px;
        left: -72px;
        height: 30px;
        background: #fff;
        padding: 5px 15px;
        transition: all 0.3s;

        &:hover {
            left: 0;
        }

        span {
            background: linear-gradient(180deg, #dc2626 80%, #f97316 60%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }

        &:before {
            content: "";
            position: absolute;
            z-index: 2;
            top: 8px;
            right: -22px;
            bottom: 15px;
            transform: rotate(-90deg);
            border-left: 15px solid #fff;
            border-right: 15px solid #fff;
            border-bottom: 15px solid transparent;
        }
    }

    .post-image {
        width: 100%;
        height: 250px;
        pointer-events: none;

        @media screen and (max-width: 920px) {
            height: 200px;
        }

        @media screen and (max-width: 470px) {
            height: 160px;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    .post-data {
        padding: 18px 12px;
        text-align: center;

        @media screen and (max-width: 920px) {
            padding: 12px 8px;
        }

        .post-title {
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: $text-color-light;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            @media screen and (max-width: 920px) {
                font-size: 18px;
                line-height: 20px;
            }

            @media screen and (max-width: 470px) {
                font-size: 16px;
                line-height: 18px;
            }
        }

        .post-created {
            margin: 10px 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: $text-gray-color;

            @media screen and (max-width: 920px) {
                font-size: 12px;
                line-height: 16px;
            }

            @media screen and (max-width: 470px) {
                font-size: 10px;
                line-height: 12px;
                margin: 5px;
            }
        }

        .post-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            width: 100%;
            font-weight: 400;
            font-size: 16px;
            line-height: 26px;
            color: $text-color-light;
            overflow: hidden;

            @media screen and (max-width: 920px) {
                font-size: 14px;
                line-height: 22px;
            }

            @media screen and (max-width: 470px) {
                font-size: 12px;
                line-height: 14px;
                margin-top: 12px;
            }
        }
    }
}
</style>
