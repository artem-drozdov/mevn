import mongoose from "mongoose";

const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            username: String,
            avatar: String,
            email: String,
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role",
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

export { User };
