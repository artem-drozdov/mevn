<template>
    <svg
        class="icon-eye"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
    >
        <path
            d="M12.81 4.36l-1.77 1.78a4 4 0 0 0-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0 1 12.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 0 1-12.62 5.64l1.77-1.78a4 4 0 0 0 4.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z"
        />
    </svg>
</template>

<script>
export default {
    name: "IconHidePass",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.icon-eye {
    display: block;
    width: 30px;
    height: 25px;
    fill: $brand-color;
    cursor: pointer;

    @media screen and (max-width: 560px) {
        width: 25px;
        height: 20px;
    }
}
</style>
