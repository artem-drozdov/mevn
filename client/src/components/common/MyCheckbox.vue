<template>
    <div class="wrapper">
        <div class="checkbox" :class="{ selected: value }">
            <input
                type="checkbox"
                id="checkbox"
                class="input"
                :checked="value"
                @input="handleChange"
            />
            <transition name="fade">
                <svg
                    v-if="value"
                    class="arrow"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 31.879 31.879"
                    style="enable-background: new 0 0 31.879 31.879"
                    xml:space="preserve"
                >
                    <g>
                        <g id="Check">
                            <g>
                                <path
                                    class="arrow-line"
                                    d="M30.708,5.091c-1.511-1.511-4.146-1.511-5.656,0L11.877,18.265l-5.05-5.051c-1.513-1.513-4.146-1.511-5.657,0
                    c-1.559,1.559-1.56,4.098,0,5.656l7.879,7.879c0.756,0.756,1.76,1.172,2.828,1.172c1.069,0,2.073-0.416,2.828-1.172l16.002-16
                    c0.756-0.756,1.172-1.761,1.172-2.829C31.879,6.852,31.463,5.847,30.708,5.091z M29.293,9.335l-16.002,16
                    c-0.756,0.756-2.072,0.756-2.828,0l-7.879-7.878c-0.779-0.78-0.779-2.049,0-2.829c0.378-0.378,0.88-0.586,1.415-0.586
                    c0.534,0,1.036,0.208,1.414,0.586l5.757,5.757c0.391,0.392,1.023,0.392,1.414,0L26.463,6.506c0.756-0.756,2.074-0.756,2.83,0
                    c0.377,0.377,0.586,0.88,0.586,1.414S29.67,8.957,29.293,9.335z"
                                />
                            </g>
                        </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
            </transition>
        </div>
        <label for="checkbox" class="label-title">{{ title }}</label>
    </div>
</template>

<script>
export default {
    name: "MyCheckbox",

    props: {
        value: {
            type: Boolean,
        },

        title: {
            type: String,
            default: "",
        },
    },

    data() {
        return {};
    },

    methods: {
        handleChange({ target }) {
            this.$emit("input", target.checked);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
    display: flex;
    align-items: center;

    .label-title {
        font-size: 18px;
        line-height: 20px;
        color: $text-color;
        padding-left: 12px;
        cursor: pointer;

        @media screen and (max-width: 760px) {
            font-size: 14px;
        }
    }
}

.checkbox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid $card-color-light;
    border-radius: 3px;

    @media screen and (max-width: 760px) {
        width: 24px;
        height: 24px;
    }

    &.selected {
        border-style: solid;
        background: linear-gradient(#0f172a, #0f172a) padding-box,
            linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%) border-box;
        border: 1px solid transparent;
    }

    .arrow {
        display: block;
        width: 23px;
        height: 23px;
        transition: 0.3s;

        @media screen and (max-width: 760px) {
            width: 18px;
            height: 18px;
        }

        .arrow-line {
            transition: 0.3s;
            fill: $brand-color;
        }
    }

    .input {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
