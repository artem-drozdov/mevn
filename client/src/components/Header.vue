<template>
    <header class="header container">
        <nav class="navbar">
            <router-link to="/">
                <div class="main-link-app">
                    <icon-brand />
                    <p class="app-name">Your Blog</p>
                </div>
            </router-link>
            <div class="link-menu">
                <router-link class="link" to="/">Home</router-link>
                <router-link class="link" v-if="showAdminBoard" to="/admin">
                    Admin Board
                </router-link>
                <router-link
                    class="link"
                    v-if="showModeratorBoard"
                    to="/moderator"
                >
                    Moderator Board
                </router-link>
                <router-link class="link" to="/posts"> Posts</router-link>
                <template v-if="!currentUser">
                    <router-link class="link" to="/signin">Login</router-link>
                    <router-link class="link" to="/signup">
                        Register
                    </router-link>
                </template>
                <template v-else>
                    <div v-click-outside="closeMenu" class="user-menu">
                        <button @click.stop="openUserMenu" class="btn-menu">
                            {{ currentUser.username }}
                        </button>
                        <div v-if="isOpenUserMenu" class="menu">
                            <ul class="list-options">
                                <li @click="goToUserPage" class="option">
                                    <div class="image">
                                        <div class="avatar">
                                            <img
                                                v-if="currentUser.avatar"
                                                class="user-avatar"
                                                :src="currentUser.avatar"
                                                :alt="`avatar-${currentUser.username}`"
                                            />
                                            <p v-else>
                                                {{
                                                    currentUser.username
                                                        | replaceAvatar
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <p class="name-option">
                                        {{ currentUser.username }}
                                    </p>
                                </li>
                                <li
                                    class="option"
                                    @mouseenter="mouseMove"
                                    @mouseleave="mouseLeave"
                                    @click="goToProfilePage"
                                >
                                    <div class="image">
                                        <icon-gear ref="icon-gear" />
                                    </div>
                                    <p class="name-option">Profile</p>
                                </li>
                                <li
                                    class="option"
                                    @mouseenter="mouseMove"
                                    @mouseleave="mouseLeave"
                                    @click.prevent="logOut"
                                >
                                    <div class="image">
                                        <icon-log-out />
                                    </div>
                                    <p class="name-option">Log Out</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ClickOutside from "vue-click-outside";
import IconBrand from "./svg/IconBrand.vue";
import IconGear from "./svg/IconGear.vue";
import IconLogOut from "./svg/IconLogOut.vue";

export default {
    name: "Header",

    directives: {
        ClickOutside,
    },

    data() {
        return {
            isOpenUserMenu: false,
        };
    },

    components: {
        IconBrand,
        IconGear,
        IconLogOut,
    },

    computed: {
        ...mapState({
            currentUser: (state) => state.auth.user,
        }),

        showAdminBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes("ROLE_ADMIN");
            }

            return false;
        },

        showModeratorBoard() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes("ROLE_MODERATOR");
            }

            return false;
        },
    },

    methods: {
        ...mapActions({
            logoutAction: "auth/logout",
        }),

        logOut() {
            this.logoutAction();
            this.$router.push("/signin");
        },

        openUserMenu() {
            this.isOpenUserMenu = !this.isOpenUserMenu;
        },

        closeMenu() {
            if (this.isOpenUserMenu) {
                this.openUserMenu();
            }
        },

        goToProfilePage() {
            if (this.$route.path !== "/profile") {
                this.$router.push("/profile");
            }

            this.openUserMenu();
        },

        goToUserPage() {
            if (this.$route.path !== "/user-page") {
                this.$router.push("/user-page");
            }

            this.closeMenu();
        },

        mouseMove($event) {
            const svg = $event.target.querySelector("svg");

            svg.classList.add("active-animate");
        },

        mouseLeave($event) {
            const svg = $event.target.querySelector("svg");
            svg.classList.remove("active-animate");
        },
    },

    filters: {
        replaceAvatar(username) {
            return username[0].toUpperCase();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/mixins.scss";

.header {
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: $main-color;
    z-index: 10;

    @include main-link-app;

    @media screen and (max-width: 900px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 560px) {
        height: 50px;
        padding: 0 12px;
    }

    .navbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .link-menu {
            display: flex;
            align-items: center;

            .user-menu {
                position: relative;
                display: flex;
                align-items: center;
                z-index: 10;

                .menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0px;
                    background-color: $card-color;
                    border-radius: 6px;
                    overflow: hidden;

                    .list-options {
                        list-style: none;
                        width: 100%;

                        .option {
                            width: 100%;
                            min-width: 150px;
                            display: flex;
                            align-items: center;
                            padding: 8px 10px;
                            cursor: pointer;
                            border: 1px solid transparent;
                            border-radius: 6px;

                            &:hover {
                                border: 1px solid #4f5054;
                            }

                            .image {
                                width: 25px;
                                height: 25px;

                                .avatar {
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 50%;
                                    background-color: #4f5054;

                                    .user-avatar {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        border-radius: 50%;
                                        object-fit: cover;
                                    }

                                    p {
                                        display: block;
                                        color: $text-color;
                                        font-size: 14px;
                                        line-height: 14px;
                                        font-weight: 600;
                                    }
                                }
                            }

                            .name-option {
                                width: max-content;
                                font-size: 16px;
                                line-height: 18px;
                                font-weight: 500;
                                margin-left: 10px;
                                color: $text-color;

                                @media screen and (max-width: 560px) {
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }

                .btn-menu {
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 20px;
                    color: $text-color-light;
                    transition: 0.3s;

                    &:hover {
                        color: $light-blue;
                    }

                    @media screen and (max-width: 560px) {
                        font-size: 12px;
                        line-height: 12px;
                    }
                }
            }

            .link {
                font-weight: 700;
                font-size: 20px;
                color: $text-color-light;
                transition: 0.3s;

                &:not(:last-child) {
                    margin-right: 20px;
                }

                &:hover {
                    color: $light-blue;
                }

                @media screen and (max-width: 560px) {
                    font-size: 12px;
                    margin-right: 10px;
                    line-height: 12px;
                }
            }
        }
    }
}
</style>
