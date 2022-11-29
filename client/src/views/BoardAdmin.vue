<template>
    <main class="home-page">
        <div class="container">
            <p>Hello on Admin page</p>
            <p>
                Content for admin: <strong>{{ message }}</strong>
            </p>
        </div>
    </main>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "BoardAdmin",

    data() {
        return {
            role: "ROLE_ADMIN",
            message: "",
        };
    },

    async created() {
        if (
            this.$store.state.auth.status.loggedIn &&
            !this.$store.state.auth.user.roles.includes(this.role)
        ) {
            this.$router.push("/");
        } else {
            const { data } = await UserService.getAdminBoard();

            this.message = data;
        }
    },
};
</script>

<style lang="scss" scoped></style>
