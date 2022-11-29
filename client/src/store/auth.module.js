import authService from "@/services/auth.service";

const token = JSON.parse(localStorage.getItem("accessToken"));
const initialState = token
    ? { status: { loggedIn: true }, user: null }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        async login({ commit }, user) {
            try {
                const response = await authService.login(user);

                commit("loginSuccess", response);
            } catch ({ response }) {
                commit("loginFailure");

                return {
                    error: true,
                    ...response.data,
                };
            }
        },

        logout({ commit }) {
            authService.logout();
            commit("logout");
        },

        async register({ commit }, user) {
            try {
                const { data } = await authService.register(user);

                commit("registerSuccess");

                return data;
            } catch ({ response }) {
                commit("registerFailure");

                return {
                    error: true,
                    ...response.data,
                };
            }
        },

        async getUser({ commit, dispatch }) {
            try {
                const user = await authService.getUser();

                commit("loginSuccess", user);
            } catch ({ response }) {
                dispatch("logout");

                return {
                    error: true,
                    ...response.data,
                };
            }
        },

        refreshToken({ commit }, accessToken) {
            commit("refreshToken", accessToken);
        },

        async changeUserProfile({ commit }, userData) {
            try {
                const user = await authService.changeUserProfile(userData);

                commit("loginSuccess", user);
            } catch ({ response }) {
                return {
                    error: true,
                    message: response.message,
                };
            }
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        registerSuccess(state) {
            state.status.loggedIn = false;
        },

        registerFailure(state) {
            state.status.loggedIn = false;
        },

        refreshToken(state, accessToken) {
            state.status.loggedIn = true;
            state.user = { ...state.user, accessToken };
        },
    },
};
