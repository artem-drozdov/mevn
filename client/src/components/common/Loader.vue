<template>
    <div v-if="isActive" class="loader"></div>
</template>

<script>
export default {
    name: "Loader",

    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.loader {
    width: 40px;
    height: 40px;
    border: 4px solid $card-color-light;
    border-top: 4px solid $brand-color;
    border-radius: 50%;
    animation: loading 1s infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
