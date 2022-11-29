<template>
    <main class="home-page">
        <div class="container">
            <p>Hello on Moderator page</p>
            <p>
                Content for moderator: <strong>{{ message }}</strong>
            </p>
        </div>
    </main>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "BoardModerator",

    data() {
        return {
            message: "",
            role: "ROLE_MODERATOR",
        };
    },

    async created() {
        if (
            this.$store.state.auth.status.loggedIn &&
            !this.$store.state.auth.user.roles.includes(this.role)
        ) {
            this.$router.push("/");
        } else {
            const { data } = await UserService.getModeratorBoard();

            this.message = data;
        }
    },
};
</script>

<style lang="scss" scoped></style>
