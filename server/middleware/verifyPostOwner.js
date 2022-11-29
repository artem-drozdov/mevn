import { checkPostOwner } from "../controllers/post.controller.js";

const verifyPostOwner = async (req, res, next) => {
    const { userId, params } = req;

    const isOwner = await checkPostOwner(userId, params.postId);

    if (!isOwner) {
        return res.status(400).send({ message: "User isn't owner this post!" });
    }

    next();
};

export { verifyPostOwner };
