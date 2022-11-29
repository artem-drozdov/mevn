import PostService from "@/services/post.service";

const initialState = {
    posts: [],
    currentPost: null,
    userPosts: [],
};

export const post = {
    namespaced: true,
    state: initialState,
    actions: {
        async createPost(_config, data) {
            try {
                await PostService.createPost(data);
            } catch (error) {
                console.log(error);
            }
        },

        async updatePost({ commit }, data) {
            try {
                const updatedPost = await PostService.updatePost(data);

                commit("setCurrentPost", updatedPost);
            } catch (error) {
                console.log(error);
            }
        },

        async getPosts({ commit }, queryParams = {}) {
            try {
                const posts = await PostService.getPosts(queryParams);

                commit("setPosts", posts);
            } catch (error) {
                console.log(error);
                commit("setPosts", []);
            }
        },

        async deletePost({ commit }, postId) {
            try {
                await PostService.deletePost(postId);
            } catch (error) {
                console.log(error);
            }
        },

        async getUserPosts({ commit }) {
            try {
                const data = await PostService.getUserPosts();

                commit("setUserPosts", data);
            } catch (error) {
                console.log(error);
                commit("setUserPosts", []);
            }
        },

        async getCurrentPost({ commit }, postId) {
            try {
                const data = await PostService.getCurrentPost(postId);

                commit("setCurrentPost", data);
            } catch (error) {
                commit("setCurrentPost", null);
            }
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setUserPosts(state, posts) {
            state.userPosts = posts;
        },

        setCurrentPost(state, post) {
            state.currentPost = post;
        },
    },
    getters: {
        getPosts: (state) => state.posts,

        getUserPosts: (state) => state.userPosts,

        getCurrentPost: (state) => state.currentPost,
    },
};
