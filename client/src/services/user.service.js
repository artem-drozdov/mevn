import api from "./api";

class UserService {
    async getPublicContent() {
        try {
            const response = await api.get("/test/all");

            return response;
        } catch ({ response }) {
            return {
                error: true,
                ...response.data,
            };
        }
    }

    async getUserBoard() {
        try {
            const response = await api.get("/test/user");

            return response;
        } catch ({ response }) {
            return {
                error: true,
                ...response.data,
            };
        }
    }

    async getModeratorBoard() {
        try {
            const response = await api.get("/test/mod");

            return response;
        } catch ({ response }) {
            return {
                error: true,
                ...response.data,
            };
        }
    }

    async getAdminBoard() {
        try {
            const response = await api.get("/test/admin");

            return response;
        } catch ({ response }) {
            return {
                error: true,
                ...response.data,
            };
        }
    }
}

export default new UserService();
