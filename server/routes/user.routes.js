import { isAdmin, isModerator, verifyToken } from "../middleware/index.js";
import {
    allAccess,
    adminBoard,
    moderatorBoard,
    userBoard,
} from "../controllers/user.controller.js";

const router = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);

    app.get("/api/test/user", [verifyToken], userBoard);

    app.get("/api/test/mod", [verifyToken, isModerator], moderatorBoard);

    app.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);
};

export { router as userRouter };
