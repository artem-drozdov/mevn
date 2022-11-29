<template>
    <div class="wrapper-layout">
        <Header />
        <main class="content-section container">
            <slot></slot>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "DefaultLayout",

    components: {
        Header,
        Footer,
    },
};
</script>

<style lang="scss" scoped>
.wrapper-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
}

.content-section {
    width: 100%;
    flex: 1;

    @media screen and (max-width: 900px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 560px) {
        height: calc(100% - 50px);
        max-height: calc(100% - 50px);
        padding: 0 12px;
    }
}
</style>
