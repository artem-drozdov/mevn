<template>
    <footer class="footer-border">
        <div class="footer container">
            <p>
                © Copyright 2022 by Ixartz’s blog. Built with
                <span class="red-heart">♥</span> by CreativeDesignsGuru
            </p>
            <div class="networks-block">
                <icon-git-hub />
                <icon-facebook />
                <icon-twitter />
                <icon-linked-in />
            </div>
        </div>
    </footer>
</template>

<script>
import IconFacebook from "./svg/IconFacebook.vue";
import IconGitHub from "./svg/IconGitHub.vue";
import IconLinkedIn from "./svg/IconLinkedIn.vue";
import IconTwitter from "./svg/IconTwitter.vue";
export default {
    components: { IconGitHub, IconFacebook, IconTwitter, IconLinkedIn },
    name: "Footer",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.footer-border {
    border-top: 1px solid $text-color;
    margin-top: 100px;

    @media screen and (max-width: 760px) {
        margin-top: 40px;
    }
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 27px 70px 57px 70px;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: $text-color;

    @media screen and (max-width: 960px) {
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 18px;
    }

    @media screen and (max-width: 760px) {
        text-align: center;
        font-weight: 400;
        padding: 10px 10px 23px 10px;
        font-size: 10px;
        line-height: 12px;
    }

    .red-heart {
        color: red;
    }

    .networks-block {
        display: flex;
        align-items: center;

        @media screen and (max-width: 960px) {
            padding-top: 10px;
        }
    }
}
</style>
