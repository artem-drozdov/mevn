import axiosInstance from "./api";
import TokenService from "./token.service";
import router from "../router";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();

            if (token) {
                config.headers["x-access-token"] = token;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async function (error) {
            const originalConfig = error.config;

            if (originalConfig.url !== "/auth/signin" && error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const response = await axiosInstance.post(
                            "/auth/refreshToken",
                            {
                                refreshToken:
                                    TokenService.getLocalRefreshToken(),
                            }
                        );

                        if (response) {
                            const { accessToken } = response.data;

                            store.dispatch("auth/refreshToken", accessToken);
                            TokenService.updateLocalAccessToken(accessToken);

                            return axiosInstance({
                                ...originalConfig,
                                headers: {
                                    ...originalConfig.headers,
                                },
                            });
                        } else {
                            store.dispatch("auth/logout");
                            router.push("/signin");
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            } else {
                return Promise.reject(error);
            }

            return Promise.reject(error);
        }
    );
};

export default setup;
