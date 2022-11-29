<template>
    <div class="wrapper-layout">
        <Header />
        <main class="content-section container">
            <slot></slot>
        </main>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name: "ProfileLayout",

    components: {
        Header,
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
    height: calc(100vh - 80px);

    @media screen and (max-width: 900px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 560px) {
        height: calc(100vh - 50px);
        max-height: calc(100vh - 50px);
        padding: 0 12px;
    }
}
</style>
