<template>
    <form name="form" class="form" @submit.prevent="handleRegister">
        <p class="response-message" v-if="message">{{ message }}</p>
        <label class="label-form">
            <div class="title-label">
                <span class="label-span">Username</span>
                <span
                    v-if="submitted && errors.has('username')"
                    class="error-span"
                >
                    {{ errors.first("username") }}
                </span>
            </div>
            <input
                type="text"
                autocomplete="false"
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                class="input-field"
                name="username"
            />
        </label>
        <label class="label-form">
            <div class="title-label">
                <span class="label-span">Email</span>
                <span
                    v-if="submitted && errors.has('email')"
                    class="error-span"
                >
                    {{ errors.first("email") }}
                </span>
            </div>
            <input
                type="email"
                v-model="user.email"
                autocomplete="false"
                v-validate="'required|email|max:50'"
                class="input-field"
                name="email"
            />
        </label>
        <label class="label-form">
            <div class="title-label">
                <span class="label-span">Password</span>
                <span
                    v-if="submitted && errors.has('password')"
                    class="error-span"
                >
                    {{ errors.first("password") }}
                </span>
            </div>
            <input
                :type="!isShowPass ? 'password' : 'text'"
                v-model="user.password"
                autocomplete="false"
                v-validate="'required|min:8|max:40'"
                class="input-field"
                name="password"
            />
            <button class="btn-eye" @click.prevent="showPassword">
                <icon-show-pass v-if="!isShowPass" />
                <icon-hide-pass v-else />
            </button>
        </label>
        <div class="button-wrapper">
            <button class="btn-signup">Sign Up</button>
        </div>
        <div class="info-block">
            <p class="text">
                If you have an account, you can
                <router-link class="brand-color" to="/signin">
                    login
                </router-link>
                here
            </p>
        </div>
    </form>
</template>

<script>
import IconShowPass from "../components/svg/IconShowPass.vue";
import IconHidePass from "../components/svg/IconHidePass.vue";
import User from "../models/user";

export default {
    name: "Register",

    components: { IconShowPass, IconHidePass },

    data() {
        return {
            user: new User("", "", ""),
            submitted: false,
            successful: false,
            message: "",
            isShowPass: false,
        };
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },

    methods: {
        handleRegister() {
            this.message = "";
            this.submitted = true;

            this.$validator.validate().then((isValid) => {
                if (isValid) {
                    this.$store.dispatch("auth/register", this.user).then(
                        (data) => {
                            this.successful = true;

                            if (data.error) {
                                this.message = data.message;
                            } else {
                                this.$router.push("/signin");
                            }
                        },
                        (error) => {
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                        }
                    );
                }
            });
        },

        showPassword() {
            this.isShowPass = !this.isShowPass;
        },
    },

    mounted() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.brand-color {
    color: $brand-color;
}

.flex-end {
    display: flex;
    justify-content: flex-end;
}

.form {
    position: relative;
    display: block;

    .response-message {
        position: absolute;
        top: -25px;
        left: 0;
        font-size: 13px;
        font-weight: 300;
        margin-bottom: 10px;
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

        .title-label {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
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

    .button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 12px;

        @media screen and (max-width: 560px) {
            margin: 0;
        }

        .btn-signup {
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
</style>
