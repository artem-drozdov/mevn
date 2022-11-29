<template>
    <div class="social-networks-block">
        <img
            class="image-network"
            src="@/assets/images/networks/twitter.png"
            alt="twitter"
        />
        <img
            class="image-network"
            src="@/assets/images/networks/facebook.png"
            alt="facebook"
        />
        <img
            class="image-network"
            src="@/assets/images/networks/youtube.png"
            alt="youtube"
        />
        <img
            class="image-network"
            src="@/assets/images/networks/linkedin.png"
            alt="linkedin"
        />
    </div>
</template>

<script>
export default {
    name: "SocialNetworksBlock",
};
</script>

<style lang="scss" scoped>
.social-networks-block {
    display: flex;
    width: fit-content;

    .image-network {
        display: block;
        font-size: 0;
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 50%;

        &:hover {
            -webkit-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            -moz-box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
            box-shadow: 0px 0px 6px 0px rgba(14, 165, 233, 1);
        }

        &:not(:last-child) {
            margin-right: 25px;
        }

        @media screen and (max-width: 760px) {
            width: 45px;
            height: 45px;
        }

        @media screen and (max-width: 560px) {
            width: 35px;
            height: 35px;
        }
    }
}
</style>
