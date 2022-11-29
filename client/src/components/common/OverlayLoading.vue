<template>
    <div class="overlay">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "OverlayLoading",
};
</script>

<style lang="scss" scoped>
.overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
