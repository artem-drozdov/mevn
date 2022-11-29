import {
    createPost,
    getCurrentPost,
    getPosts,
    getUserPosts,
    updatePost,
    deletePost,
} from "../controllers/post.controller.js";
import {
    defineUser,
    verifyPostOwner,
    verifyToken,
} from "../middleware/index.js";
import { requireRequestBodyUpdatePost } from "../middleware/requireBody.js";
import { upload } from "../middleware/upload.js";

const router = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/posts", getPosts);

    app.get("/api/post/:postId", defineUser, getCurrentPost);

    app.get("/api/user-posts", verifyToken, getUserPosts);

    app.post("/api/post", [verifyToken, upload.single("image")], createPost);

    app.put(
        "/api/post",
        [verifyToken, upload.single("image"), requireRequestBodyUpdatePost],
        updatePost
    );

    app.delete("/api/post/:postId", [verifyToken, verifyPostOwner], deletePost);
};

export { router as postRouter };
