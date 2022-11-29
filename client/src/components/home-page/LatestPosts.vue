<template>
    <section v-if="posts.length" class="latest-post-block">
        <div class="title-block">
            <p class="title">Latest <span class="brand-color">Posts</span></p>
            <div class="link-to-posts">
                <router-link to="/posts">
                    <p class="view-all-posts">View all Posts</p>
                </router-link>
                <icon-arrow-right />
            </div>
        </div>
        <div class="post-list">
            <VueSlickCarousel v-bind="settingsCarousel">
                <post-card v-for="post in posts" :key="post.id" :post="post" />
                <template #prevArrow="arrowOption">
                    <button
                        :disabled="arrowOption.currentSlide === 0"
                        class="custom-arrow prev"
                    >
                        <icon-slide
                            :direction="'left'"
                            :active="arrowOption.currentSlide === 0"
                        />
                    </button>
                </template>
                <template #nextArrow="arrowOption">
                    <button
                        :disabled="
                            arrowOption.currentSlide ===
                            arrowOption.slideCount -
                                settingsCarousel.slidesToShow
                        "
                        class="custom-arrow next"
                    >
                        <icon-slide
                            :direction="'right'"
                            :active="
                                arrowOption.currentSlide ===
                                arrowOption.slideCount -
                                    settingsCarousel.slidesToShow
                            "
                        />
                    </button>
                </template>
            </VueSlickCarousel>
        </div>
    </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import IconArrowRight from "../svg/IconArrowRight.vue";
import IconSlide from "../svg/IconSlide.vue";
import PostCard from "./PostCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "LatestPosts",

    components: { IconArrowRight, PostCard, VueSlickCarousel, IconSlide },

    data() {
        return {
            settingsCarousel: {
                dots: false,
                touchMove: false,
                infinite: false,
                adaptiveHeight: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            touchMove: true,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            touchMove: true,
                            slidesToShow: 1.5,
                            slidesToScroll: 1,
                        },
                    },
                ],
            },
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
    },

    async mounted() {
        await this.getPosts({ limit: 5 });
    },
};
</script>

<style lang="scss">
.slick-slide {
    padding: 0 10px;
    box-sizing: border-box;
}

.custom-arrow {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -40px;
    right: 65px;
    cursor: pointer;

    &:disabled {
        cursor: default;
    }

    &.next {
        right: 20px;
    }
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.brand-color {
    @include linear-background-brand;
}

.latest-post-block {
    width: 100%;
    margin-top: 90px;

    @media screen and (max-width: 760px) {
        margin-top: 56px;
    }

    .title-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            @include title-home-page;
        }

        .link-to-posts {
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                @include linear-background-brand;
            }
        }

        .view-all-posts {
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            margin-right: 12px;
            color: $text-color-light;

            @media screen and (max-width: 560px) {
                font-size: 16px;
                margin-right: 4px;
            }
        }
    }

    .post-list {
        width: 100%;
        margin: 80px 0;
        position: relative;

        @media screen and (max-width: 760px) {
            margin: 30px 0 50px 0;
        }
    }
}
</style>
