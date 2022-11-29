<template>
    <div>
        <div class="introductory-block">
            <div class="text-block">
                <h1 class="title">
                    Hi there, I'm <span class="brand-color">Your Blog</span>👋
                </h1>
                <p class="introductory-text">
                    This site is for publishing your posts. All functionality is
                    free and does not require long content moderation checks and
                    placement fees. If you have something to write about, share
                    it with the world.
                </p>
            </div>
            <div class="image-block">
                <img src="@/assets/images/Man.png" alt="man" />
            </div>
        </div>
        <div class="block-for-networks">
            <social-networks-block />
        </div>
    </div>
</template>

<script>
import SocialNetworksBlock from "../common/SocialNetworksBlock.vue";
export default {
    components: { SocialNetworksBlock },
    name: "IntroductoryBlock",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.introductory-block {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 760px) {
        flex-direction: column-reverse;
        align-items: center;
    }

    .brand-color {
        @include linear-background-brand;
    }

    .text-block {
        width: 60%;

        @media screen and (max-width: 760px) {
            width: 100%;
            text-align: center;
            margin-top: 20px;
        }

        .title {
            @include title-home-page;
        }

        .introductory-text {
            margin-top: 30px;
            font-size: 18px;
            font-weight: 500;
            line-height: 30px;
            color: $text-color;

            @media screen and (max-width: 760px) {
                margin-top: 20px;
            }

            @media screen and (max-width: 560px) {
                font-size: 14px;
                line-height: 26px;
                padding: 0 20px;
            }
        }
    }

    .image-block {
        width: 30%;
        height: 80%;
        display: flex;
        justify-content: center;

        @media screen and (max-width: 760px) {
            width: auto;
        }

        @media screen and (max-width: 560px) {
            width: auto;
        }

        img {
            width: 200px;
            height: 200px;
            display: block;
            font-size: 0;

            @media screen and (max-width: 560px) {
                width: 100px;
                height: 100px;
            }
        }
    }
}

.block-for-networks {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;

    @media screen and (max-width: 760px) {
        justify-content: center;
        margin-top: 20px;
    }
}
</style>
