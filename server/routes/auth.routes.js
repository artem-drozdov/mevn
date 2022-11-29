import {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted,
    verifyToken,
} from "../middleware/index.js";
import {
    getUser,
    signIn,
    signUp,
    refreshToken,
    changeProfile,
} from "../controllers/auth.controller.js";
import {
    requireRequestBodySignIn,
    requireRequestBodySignUp,
} from "../middleware/requireBody.js";
import { upload } from "../middleware/upload.js";

const router = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post(
        "/api/auth/signup",
        [
            requireRequestBodySignUp,
            checkDuplicateUserNameOrEmail,
            checkRolesExisted,
        ],
        signUp
    );

    app.get("/api/auth/me", verifyToken, getUser);

    app.put(
        "/api/auth/user",
        [verifyToken, upload.single("avatar")],
        changeProfile
    );

    app.post("/api/auth/signin", requireRequestBodySignIn, signIn);

    app.post("/api/auth/refreshToken", refreshToken);
};

export { router as authRouter };
