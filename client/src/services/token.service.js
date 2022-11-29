class TokenService {
    getLocalRefreshToken() {
        return JSON.parse(localStorage.getItem("refreshToken"));
    }

    getLocalAccessToken() {
        return JSON.parse(localStorage.getItem("accessToken"));
    }

    updateLocalAccessToken(token) {
        localStorage.setItem("accessToken", JSON.stringify(token));
    }

    updateLocalRefreshToken(token) {
        localStorage.setItem("refreshToken", JSON.stringify(token));
    }

    removeTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}

export default new TokenService();
