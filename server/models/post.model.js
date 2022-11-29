import mongoose from "mongoose";

const Post = mongoose.model(
    "Post",
    new mongoose.Schema(
        {
            title: String,
            description: String,
            image: String,
            hidden: {
                type: Boolean,
                default: false,
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
        {
            timestamps: true,
        }
    )
);

export { Post };
