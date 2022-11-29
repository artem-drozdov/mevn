import api from "./api";
import TokenService from "./token.service";

class AuthService {
    async login({ username, password }) {
        const { data } = await api.post("/auth/signin", {
            username,
            password,
        });

        if (data.accessToken) {
            TokenService.updateLocalAccessToken(data.accessToken);
            TokenService.updateLocalRefreshToken(data.refreshToken);
        }

        return data;
    }

    logout() {
        TokenService.removeTokens();
    }

    async register({ username, password, email }) {
        const response = await api.post("/auth/signup", {
            username,
            email,
            password,
        });

        return response;
    }

    async getUser() {
        const { data } = await api.get("/auth/me");

        return data;
    }

    async changeUserProfile(userData) {
        const { data } = await api.put("/auth/user", userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    }
}

export default new AuthService();
