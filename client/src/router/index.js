import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/signin",
        name: "login",
        meta: {
            layout: "auth-layout",
        },
        component: Login,
    },
    {
        path: "/signup",
        name: "register",
        meta: {
            layout: "auth-layout",
        },
        component: Register,
    },
    {
        path: "/profile",
        name: "profile",
        meta: {
            layout: "profile-layout",
        },
        component: () => import("../views/Profile.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../views/BoardAdmin.vue"),
    },
    {
        path: "/moderator",
        name: "moderator",
        component: () => import("../views/BoardModerator.vue"),
    },
    {
        path: "/user-page",
        name: "user-page",
        component: () => import("../views/UserPage.vue"),
    },
    {
        path: "/posts",
        name: "posts",
        component: () => import("../views/PostsPage.vue"),
    },
    {
        path: "/post/:postId",
        name: "post-page",
        component: () => import("../views/PostPage.vue"),
    },
    {
        path: "*",
        name: "not-found",
        meta: {
            layout: "profile-layout",
        },
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return { ...savedPosition, behavior: "smooth" };
        }

        return { y: 0, behavior: "smooth" };
    },
});

router.beforeEach(async (to, _from, next) => {
    const privateRoutes = ["/admin", "/moderator", "/user-page", "/profile"];
    const authRequired = privateRoutes.includes(to.path);
    const loggedIn = localStorage.getItem("accessToken");

    if (authRequired && !loggedIn) {
        next("/signin");
    } else {
        next();
    }
});

export default router;
