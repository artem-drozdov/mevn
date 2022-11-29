<template>
    <transition name="open-modal">
        <div
            v-if="isOpen"
            @click.self.prevent.stop="closeModal"
            class="modal-wrapper"
        >
            <div class="modal" :class="{ 'auto-width': autoSizeContent }">
                <button
                    v-if="hasCloseButton"
                    @click.stop="closeModal"
                    class="btn-close-modal"
                >
                    <icon-close />
                </button>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
import IconClose from "../svg/IconClose.vue";

export default {
    components: { IconClose },
    name: "Modal",

    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },

        autoSizeContent: {
            type: Boolean,
            default: false,
        },

        hasCloseButton: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {};
    },

    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.75);

    .modal {
        position: relative;
        width: 70%;
        z-index: 25;

        &.auto-width {
            width: auto;

            @media screen and (max-width: 560px) {
                width: 90%;
            }
        }

        @media screen and (max-width: 560px) {
            width: 90%;
        }

        .btn-close-modal {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: $text-color;
            font-size: 16px;
            line-height: 18px;
            background-color: $card-color-light;
            z-index: 30;
            cursor: pointer;
        }
    }
}

.open-modal-enter-active,
.open-modal-leave-active {
    transition: opacity 0.3s;
}
.open-modal-enter,
.open-modal-leave-to {
    opacity: 0;
}
</style>
