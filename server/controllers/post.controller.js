import { db } from "../models/index.js";
import { __dirname } from "../index.js";
import fs from "fs";

const BASE_URL = process.env.BASE_IMAGE_URL || "http://localhost:8081/images/";

const createPost = async (req, res) => {
    const { body, userId, file } = req;

    const image = file ? `${BASE_URL}${file.filename}` : null;

    new db.post({
        title: body.title,
        description: body.description,
        image,
        hidden: body.hidden,
        author: userId,
    }).save((err, post) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        return res.status(200).send(post);
    });
};

const getPosts = async (req, res) => {
    const { query } = req;

    const posts = await db.post
        .find({ hidden: false })
        .limit(query.limit)
        .select("title description createdAt image")
        .sort({ createdAt: -1 });

    return res.status(200).send(posts);
};

const getUserPosts = async (req, res) => {
    const { userId } = req;

    const posts = await db.post
        .find({
            author: userId,
        })
        .select("title description createdAt hidden image")
        .sort({ createdAt: -1 });

    return res.status(200).send(posts);
};

const getCurrentPost = async (req, res) => {
    const { params, userId } = req;

    try {
        const currentPost = await db.post
            .findOne({ _id: params.postId })
            .populate("author", "username avatar email")
            .select("title description createdAt hidden image");

        if (currentPost.hidden) {
            if (currentPost.author._id.equals(userId)) {
                return res.status(200).send(currentPost);
            } else {
                return res
                    .status(400)
                    .send({ message: "This post was hidden by author!" });
            }
        } else {
            return res.status(200).send(currentPost);
        }
    } catch (error) {
        return res.status(400).send({ error: true, message: error });
    }
};

const updatePost = async (req, res) => {
    const { userId, body, file } = req;

    const newImage = file && `${BASE_URL}${file.filename}`;

    try {
        const post = await db.post
            .findOne({
                _id: body.postId,
                author: userId,
            })
            .populate("author", "username avatar email")
            .select("title description createdAt hidden image");

        delete body.postId;

        if (newImage && post.image) {
            const pathOldImage = post.image.split("/images/")[1];

            await fs.unlink(`upload/images/${pathOldImage}`, (err) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
            });
        }

        if (newImage) {
            body.image = newImage;
        } else {
            delete body.image;
        }

        for (let key in body) {
            post[key] = body[key];
        }

        post.save().then((post) => {
            return res.status(200).send(post);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

const checkPostOwner = async (userId, postId) => {
    const currentPost = await db.post.findById(postId);

    if (!currentPost) {
        return false;
    }

    return currentPost.author._id.equals(userId);
};

const deletePost = async (req, res) => {
    const { params } = req;

    try {
        const deletedPost = await db.post.findByIdAndRemove(params.postId);

        if (deletedPost.image) {
            const pathOldImage = deletedPost.image.split("/images/")[1];

            await fs.unlink(`upload/images/${pathOldImage}`, (err) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
            });
        }

        return res
            .status(200)
            .send({ message: "Post was deleted successful!" });
    } catch (error) {
        return res.status(400).send(error);
    }
};

export {
    createPost,
    getPosts,
    getUserPosts,
    getCurrentPost,
    updatePost,
    checkPostOwner,
    deletePost,
};
