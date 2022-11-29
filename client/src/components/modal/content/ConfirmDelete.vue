<template>
    <div class="wrapper">
        <div class="modal-content">
            <p class="text">Are you sure that you want to delete this post?</p>
            <div class="buttons-block">
                <button @click="handleConfirm" class="btn-confirm">
                    Confirm
                </button>
                <button @click="handleCancel" class="btn-discard">
                    Discard
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmDelete",

    methods: {
        handleConfirm() {
            this.$emit("click-confirm");
        },

        handleCancel() {
            this.$emit("click-cancel");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
    width: 100%;
    border-radius: 8px;
    background-color: #000000;
}

.modal-content {
    width: 100%;
    padding: 26px;
    border-radius: 8px;
    text-align: center;
    background: linear-gradient(
        180deg,
        rgb(218, 50, 50, 0.5) 0%,
        rgb(195, 60, 60, 1) 100%
    );

    .text {
        font-size: 20px;
        line-height: 22px;
        color: $text-color;
    }

    .buttons-block {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 40px;

        @media screen and (max-width: 420px) {
            justify-content: center;
        }

        button {
            font-size: 18px;
            line-height: 20px;
            padding: 6px 18px;
            color: $text-color;
            border: 1px solid $text-color;
            border-radius: 4px;
            transition: all 0.2s;

            &:hover {
                color: #ffffff;
                -webkit-box-shadow: 0px 0px 10px 3px rgba(173, 183, 195, 0.67);
                box-shadow: 0px 0px 10px 3px rgba(173, 183, 195, 0.67);
            }
        }

        .btn-confirm {
        }

        .btn-discard {
        }

        button:first-child {
            margin-right: 12px;
        }
    }
}
</style>
