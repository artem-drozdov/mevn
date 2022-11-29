<template>
    <form name="form" class="form" @submit.prevent="handleLogin">
        <p class="response-message" v-if="message">{{ message }}</p>
        <label class="label-form">
            <div class="flex-between">
                <span class="label-span">Username</span>
                <span v-if="errors.has('username')" class="error-span">
                    {{ errors.first("username") }}
                </span>
            </div>
            <input
                type="text"
                v-model="user.username"
                v-validate="'required'"
                class="input-field"
                name="username"
            />
        </label>
        <label class="label-form">
            <div class="flex-between">
                <span class="label-span">Password</span>
                <span v-if="errors.has('password')" class="error-span">
                    {{ errors.first("password") }}
                </span>
            </div>
            <input
                :type="!isShowPass ? 'password' : 'text'"
                v-model="user.password"
                autocomplete="false"
                v-validate="'required|min:8'"
                class="input-field"
                name="password"
            />
            <button class="btn-eye" @click.prevent="showPassword">
                <icon-show-pass v-if="!isShowPass" />
                <icon-hide-pass v-else />
            </button>
        </label>
        <div class="button-wrapper">
            <button :disabled="loading" class="btn-login">Login</button>
        </div>
        <div class="info-block">
            <p class="text">
                If you don't have account, you can
                <router-link class="brand-color" to="/signup">
                    register</router-link
                >
            </p>
        </div>
    </form>
</template>

<script>
import IconHidePass from "../components/svg/IconHidePass.vue";
import IconShowPass from "../components/svg/IconShowPass.vue";
import User from "../models/user";

export default {
    name: "Login",

    components: { IconShowPass, IconHidePass },

    data() {
        return {
            user: new User("", ""),
            loading: false,
            message: "",
            isShowPass: false,
        };
    },

    computed: {
        loggedIn() {
            return (
                this.$store.state.auth.status.loggedIn &&
                this.$store.state.auth.user
            );
        },
    },

    methods: {
        async handleLogin() {
            this.loading = true;
            this.$validator.validateAll().then((isValid) => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                if (this.user.username && this.user.password) {
                    this.$store
                        .dispatch("auth/login", this.user)
                        .then((response) => {
                            if (response && response.error) {
                                this.loading = false;
                                this.message = response.message;
                            } else {
                                this.$router.push("/profile");
                            }
                        });
                }
            });
        },

        showPassword() {
            this.isShowPass = !this.isShowPass;
        },
    },

    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.flex-between {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 6px;

    @media screen and (max-width: 560px) {
        margin: 0;
    }
}

.form {
    position: relative;
    display: flex;
    flex-direction: column;

    .brand-color {
        color: $brand-color;
    }

    .response-message {
        position: absolute;
        top: -25px;
        left: 0;
        font-size: 13px;
        font-weight: 300;
        color: $error-color;

        @media screen and (max-width: 560px) {
            top: -18px;
            font-size: 11px;
        }
    }

    .label-form {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        @media screen and (max-width: 560px) {
            margin-bottom: 12px;
        }

        .btn-eye {
            position: absolute;
            right: 0px;
            bottom: 5px;
        }

        .label-span {
            color: $text-color;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;

            @media screen and (max-width: 560px) {
                font-size: 12px;
                line-height: 16px;
            }
        }

        .error-span {
            font-size: 12px;
            font-weight: 300;
            letter-spacing: 0.4px;
            color: $error-color;

            @media screen and (max-width: 560px) {
                font-size: 10px;
            }
        }
    }

    .input-field {
        padding: 6px 12px;
        font-size: 16px;
        color: $text-color;
        border: none;
        outline: none;
        border-bottom: 1px solid $brand-color;

        @media screen and (max-width: 560px) {
            font-size: 14px;
        }
    }

    .info-block {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 6px;

        @media screen and (max-width: 560px) {
            margin-top: 20px;
        }

        .text {
            font-size: 12px;
            color: $text-gray-color;
        }
    }
}

.button-wrapper {
    display: flex;
    justify-content: flex-end;

    .btn-login {
        border: 1px solid $brand-color;
        font-size: 16px;
        color: $text-color;
        padding: 6px 30px;
        border-radius: 2px;
        transition: 0.3s;

        @media screen and (max-width: 560px) {
            font-size: 12px;
            padding: 6px 20px;
        }

        &:hover {
            -webkit-box-shadow: 0px 0px 5px 0px rgba(14, 165, 233, 1);
            -moz-box-shadow: 0px 0px 5px 0px rgba(14, 165, 233, 1);
            box-shadow: 0px 0px 5px 0px rgba(14, 165, 233, 1);
        }
    }
}
</style>
