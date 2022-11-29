<template>
    <section class="subscribe-block">
        <div class="left-block">
            <p class="title">
                Subscribe to receive notifications of
                <span class="brand-color">new posts.</span>
            </p>
            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus malesuada nisi tellus, non imperdiet nisi tempor at.
            </p>
        </div>
        <div class="right-block">
            <form class="subscribe-form">
                <input
                    type="email"
                    class="email-input"
                    placeholder="Enter your Email"
                />
                <button class="btn-subscribe">Subscribe</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: "SubscribeBlock",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.brand-color {
    @include linear-background-brand;
}

.subscribe-block {
    width: 100%;
    display: flex;

    @media screen and (max-width: 960px) {
        display: block;
    }

    .title {
        @include title-home-page;
    }

    .left-block {
        padding-right: 25px;

        @media screen and (max-width: 960px) {
            text-align: center;
        }
    }

    .right-block {
        display: flex;
        align-items: center;
        padding-left: 25px;

        @media screen and (max-width: 960px) {
            margin-top: 30px;
        }
    }

    .left-block,
    .right-block {
        width: 50%;

        @media screen and (max-width: 960px) {
            width: 100%;
            padding: 0;
        }
    }

    .description {
        font-weight: 400;
        font-size: 17px;
        line-height: 26px;
        color: $text-color;
        margin-top: 25px;
    }

    .subscribe-form {
        display: flex;
        width: 100%;
        height: auto;
        background: $card-color;
        border-radius: 30px;
        padding: 0 12px 0 0;

        .email-input {
            width: 100%;
            padding-left: 30px;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: $text-color;

            @media screen and (max-width: 960px) {
                font-size: 14px;
                padding-left: 20px;
            }
        }

        .btn-subscribe {
            padding: 10px 30px;
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            color: $card-color;
            background: linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%);
            border-radius: 30px;
            margin: 12px 0;
            transition: 0.3s;

            @media screen and (max-width: 960px) {
                margin: 8px 0;
                padding: 6px 18px;
                font-size: 14px;
                line-height: 18px;
            }

            &:hover {
                color: $main-color;
                -webkit-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
                -moz-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
                box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            }
        }
    }
}
</style>
