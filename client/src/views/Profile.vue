<template>
    <div
        v-if="currentUser"
        class="profile-page"
        :class="{ 'setting-active': settingActive }"
    >
        <div class="first-block">
            <p class="username">{{ currentUser.username }}</p>
            <div class="avatar">
                <button
                    v-if="previewImage"
                    @click.stop.prevent="deleteSelectedImage"
                    class="delete-selected-image"
                >
                    <icon-close />
                </button>
                <div v-if="settingActive" class="overlay">
                    <input
                        type="file"
                        class="input-image"
                        name="avatar"
                        accept="image/*"
                        @change="handleSelectAvatar"
                    />
                    <span class="placeholder">Upload avatar</span>
                </div>
                <img
                    v-if="previewImage"
                    :src="previewImage"
                    alt="preview-avatar"
                    class="preview-avatar"
                />
                <img
                    v-if="userForm.avatar && !previewImage"
                    :src="userForm.avatar"
                    alt="avatar"
                    class="current-avatar"
                />
                <p v-else-if="!userForm.avatar && !previewImage">
                    {{ currentUser.username | replaceAvatar }}
                </p>
            </div>
            <button
                class="btn-change"
                :class="{ active: settingActive }"
                @click.stop="handleSetting"
            >
                <span>
                    {{
                        settingActive ? "Discard Changes" : "Change Information"
                    }}
                </span>
            </button>
        </div>
        <div class="second-block">
            <form>
                <button
                    @click.stop.prevent="handleSetting"
                    class="mobile-btn-edit"
                >
                    <transition name="change-button" mode="out-in">
                        <icon-edit v-if="!settingActive" />
                        <icon-close
                            :class="'red-color'"
                            :width="24"
                            :height="24"
                            v-else
                        />
                    </transition>
                </button>
                <label class="label-input" :class="{ active: settingActive }">
                    <input
                        :disabled="!settingActive"
                        type="text"
                        name="Username"
                        v-validate="'required|min:3|max:20'"
                        autocomplete="false"
                        v-model="userForm.username"
                    />
                    <span class="label-name">Username</span>
                    <span class="error-span" v-if="errors.has('Username')">{{
                        errors.first("Username")
                    }}</span>
                </label>
                <label class="label-input" :class="{ active: settingActive }">
                    <input
                        :disabled="!settingActive"
                        type="email"
                        name="Email"
                        v-validate="'required|email|max:50'"
                        autocomplete="false"
                        v-model="userForm.email"
                    />
                    <span class="label-name">Email</span>
                    <span class="error-span" v-if="errors.has('Email')">{{
                        errors.first("Email")
                    }}</span>
                </label>
                <transition name="fade">
                    <div class="btn-block" v-if="settingActive">
                        <button
                            class="btn-save"
                            :class="{ disabled: !isChanged }"
                            @click.stop.prevent="saveChanges"
                        >
                            Save
                        </button>
                    </div>
                </transition>
            </form>
            <p class="registered-date">
                Registered on the site from:
                {{ currentUser.createdAt | moment("YYYY-MM-DD hh:mm:ss") }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IconClose from "../components/svg/IconClose.vue";
import IconEdit from "../components/svg/IconEdit.vue";

export default {
    components: { IconEdit, IconClose },
    name: "Profile",

    data() {
        return {
            loading: false,
            settingActive: false,
            isChanged: false,
            watcher: null,
            userForm: {
                username: "",
                email: "",
                avatar: "",
            },
            selectedImage: null,
            previewImage: null,
        };
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/getUser",
        }),
    },

    methods: {
        ...mapActions({
            changeUserProfile: "auth/changeUserProfile",
        }),

        handleSetting() {
            this.settingActive = !this.settingActive;

            if (!this.settingActive) {
                this.selectedImage = null;
                this.previewImage = null;
            }
        },

        async saveChanges() {
            this.loading = true;

            this.$validator.validateAll().then(async (isValid) => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                try {
                    const formData = new FormData();

                    formData.append("username", this.userForm.username);
                    formData.append("email", this.userForm.email);

                    if (this.selectedImage) {
                        formData.append("avatar", this.selectedImage);
                    }

                    await this.changeUserProfile(formData);

                    this.userForm.avatar = this.currentUser.avatar;
                    this.settingActive = false;
                    this.userForm.username = this.currentUser.username;
                    this.userForm.email = this.currentUser.email;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                    this.isChanged = false;
                    this.selectedImage = null;
                    this.previewImage = null;
                    this.watcher = this.$watch(
                        "userForm",
                        () => {
                            this.isChanged = true;
                            this.watcher();
                        },
                        { deep: true }
                    );
                }
            });
        },

        handleSelectAvatar({ target }) {
            this.isChanged = true;
            this.selectedImage = target.files.item(0);
            this.previewImage = URL.createObjectURL(this.selectedImage);
        },

        deleteSelectedImage() {
            this.selectedImage = null;
            this.previewImage = null;
        },
    },

    filters: {
        replaceAvatar(username) {
            return username[0].toUpperCase();
        },
    },

    mounted() {
        if (this.currentUser) {
            this.userForm.username = this.currentUser.username;
            this.userForm.email = this.currentUser.email;
            this.userForm.avatar = this.currentUser.avatar;

            this.watcher = this.$watch(
                "userForm",
                () => {
                    this.isChanged = true;
                    this.watcher();
                },
                { deep: true }
            );
        } else {
            this.$router.push("/");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.profile-page {
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
    margin: 10px 0;
    overflow: hidden;
    transition: all 0.3s;

    &.setting-active {
        border-radius: 20px 0 0 20px;

        @media screen and (max-width: 620px) {
            border-radius: 10px;
        }

        .first-block {
            width: 30%;
            height: 100%;

            @media screen and (max-width: 620px) {
                width: 100%;
                height: 5%;
            }

            .avatar {
                top: 20px;
                left: calc(50% - 80px);

                @media screen and (max-width: 620px) {
                    top: calc(100% + 20px);
                    left: calc(50% - 60px);
                }
            }

            .username {
                opacity: 1;
                visibility: visible;

                @media screen and (max-width: 620px) {
                    display: none;
                }
            }
        }

        .second-block {
            top: 0;
            left: 30%;
            width: calc(70% - 10px);
            height: 100%;
            padding-top: 20px;
            border-top: none;
            border-radius: 0 20px 20px 0;
            margin-left: 10px;

            @media screen and (max-width: 620px) {
                top: calc(5% + 10px);
                left: 0;
                width: 100%;
                margin-left: 0;
                padding-top: 140px;
                border-radius: 0px;
            }
        }
    }

    .first-block {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30%;
        transition: all 0.3s linear;
        @include background-brand-color;

        @media screen and (max-width: 560px) {
            flex: 1;
        }

        .username {
            opacity: 0;
            visibility: hidden;
            margin-top: 200px;
            font-size: 20px;
            line-height: 22px;
            color: $main-color;
            text-align: center;
        }

        .btn-change {
            position: absolute;
            bottom: 30px;
            right: 30px;
            font-size: 14px;
            line-height: 16px;
            padding: 8px 15px;
            color: $text-color;
            border: 1px solid $text-color;
            border-radius: 4px;
            transition: 0.3s;

            @media screen and (max-width: 620px) {
                display: none;
            }

            &:hover {
                color: $text-color-light;
                -webkit-box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.49);
                box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.49);
            }

            &.active {
                border-color: $error-color;
                background: linear-gradient(
                    180deg,
                    rgba(220, 38, 38, 0.6) 0%,
                    rgba(249, 115, 22, 0.2) 100%
                );

                span {
                    color: $error-color;
                }

                &:hover {
                    -webkit-box-shadow: 0px 0px 10px 0px $error-color;
                    box-shadow: 0px 0px 10px 0px $error-color;
                }
            }
        }

        .avatar {
            position: absolute;
            top: calc(100% - 80px);
            left: calc(50% - 80px);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 4px solid #ffffff;
            background-color: $card-color;
            transition: all 0.3s linear;
            z-index: 5;

            &:hover {
                .overlay {
                    visibility: visible;

                    @media screen and (max-width: 620px) {
                        opacity: 0;
                    }
                }
            }

            .current-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            .overlay {
                visibility: hidden;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: rgb(28 31 36 / 85%);
                border-radius: 50%;
                z-index: 7;

                .placeholder {
                    display: block;
                    border: 1px solid $text-color;
                    color: $text-color;
                    padding: 6px 12px;
                    font-size: 14px;
                }
            }

            .preview-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                z-index: 6;
            }

            .input-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                opacity: 0;
                cursor: pointer;
            }

            p {
                font-size: 58px;
                line-height: 58px;
                color: $text-color;
            }

            .delete-selected-image {
                position: absolute;
                top: -10px;
                right: -10px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                color: #fff;
                font-size: 12px;
                line-height: 12px;
                background-color: $card-color;

                @media screen and (max-width: 620px) {
                    top: -12px;
                    right: -20px;
                    border: 1px solid $text-color;
                }
            }

            @media screen and (max-width: 560px) {
                top: calc(100% - 60px);
                left: calc(50% - 60px);
                width: 120px;
                height: 120px;

                p {
                    font-size: 38px;
                    line-height: 38px;
                }
            }
        }
    }

    .second-block {
        position: absolute;
        top: 30%;
        left: 0;
        width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        transition: all 0.3s linear;
        background-color: $card-color;
        border-top: 1px solid #ffffff;

        @media screen and (max-width: 560px) {
            flex: 3;
        }

        form {
            width: 70%;

            @media screen and (max-width: 520px) {
                width: 95%;
            }

            .mobile-btn-edit {
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
                display: none;

                svg {
                    fill: #0ea5e9;
                }

                svg.red-color {
                    fill: $error-color;
                }

                @media screen and (max-width: 620px) {
                    display: block;
                }
            }

            .label-input {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: column-reverse;

                &.active {
                    .label-name,
                    input {
                        color: $text-color;
                    }

                    input {
                        border-color: $border-color;
                    }
                }

                &:not(:last-child) {
                    margin-bottom: 20px;
                }

                span.error-span {
                    position: absolute;
                    top: 3px;
                    right: 0;
                    font-size: 10px;
                    line-height: 12px;
                    color: $error-color;
                }

                span {
                    display: block;
                    font-size: 16px;
                    line-height: 18px;
                    color: $text-gray-color;
                    margin-bottom: 6px;
                    transition: all 0.3s;
                }

                input {
                    width: 100%;
                    padding: 10px 18px;
                    font-size: 18px;
                    color: $text-gray-color;
                    line-height: 20px;
                    border: 1px solid $card-color-light;
                    border-radius: 4px;
                    transition: all 0.3s;

                    &:focus {
                        & ~ .label-name {
                            color: $brand-color;
                        }

                        border-color: $brand-color;
                    }
                }
            }

            .btn-block {
                display: flex;
                justify-content: flex-end;
                margin-top: 30px;

                button {
                    padding: 8px 30px;
                    border: 1px solid $border-color;
                    border-radius: 4px;
                    font-size: 16px;
                    line-height: 18px;
                    color: $text-color;
                    transition: 0.3s;

                    &.disabled {
                        pointer-events: none;
                    }

                    &:hover,
                    &:focus {
                        color: $brand-color;
                        -webkit-box-shadow: inset 0px 0px 6px 0px
                            rgba(14, 165, 233, 1);
                        -moz-box-shadow: inset 0px 0px 6px 0px
                            rgba(14, 165, 233, 1);
                        box-shadow: inset 0px 0px 6px 0px rgba(14, 165, 233, 1);
                        border-style: solid;
                        background: linear-gradient($card-color, $card-color)
                                padding-box,
                            linear-gradient(270deg, #22d3ee 50%, #0ea5e9 100%)
                                border-box;
                        border: 1px solid transparent;
                    }
                }
            }
        }

        .user-name {
            font-size: 32px;
            line-height: 34px;
            color: $text-color;
            letter-spacing: 0.3px;
        }

        .user-email {
            font-size: 18px;
            line-height: 20px;
            color: $text-color;
            margin-top: 5px;
        }

        .registered-date {
            position: absolute;
            bottom: 20px;
            font-size: 12px;
            margin-top: 10px;
            color: $text-color;

            @media screen and (max-width: 620px) {
                bottom: 55px;
            }
        }
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

.change-button-enter-active,
.change-button-leave-active {
    transition: all 0.3s;
}
.change-button-enter,
.change-button-leave-to {
    opacity: 0;
    transform: translateX(50px);
}
</style>
