import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";
import { RefreshToken } from "./refreshToken.model.js";
import { Post } from "./post.model.js";

mongoose.Promise = global.Promise;
const db = {
    init() {
        this.role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new this.role({
                    name: "user",
                }).save((err) => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'user' to roles collection");
                });

                new this.role({
                    name: "moderator",
                }).save((err) => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'moderator' to roles collection");
                });

                new this.role({
                    name: "admin",
                }).save((err) => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'admin' to roles collection");
                });
            }
        });
    },
    mongoose,
    user: User,
    role: Role,
    post: Post,
    refreshToken: RefreshToken,
    ROLES: ["user", "admin", "moderator"],
};

export { db };
