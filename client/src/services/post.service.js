import api from "./api";

class PostService {
    async createPost(postData) {
        const { data } = await api.post("/post", postData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async deletePost(postId) {
        const { data } = await api.delete(`/post/${postId}`);

        return data;
    }

    async updatePost(postData) {
        const { data } = await api.put("/post", postData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }

    async getPosts(queryParams) {
        const { limit } = queryParams;

        const { data } = await api.get(
            `/posts${limit ? "?limit=" + limit : ""}`
        );

        return data;
    }

    async getUserPosts() {
        const { data } = await api.get("/user-posts");

        return data;
    }

    async getCurrentPost(postId) {
        const { data } = await api.get(`/post/${postId}`);

        return data;
    }
}

export default new PostService();
