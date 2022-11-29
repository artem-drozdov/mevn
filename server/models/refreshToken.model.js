import mongoose from "mongoose";
import { v4 } from "uuid";

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();
    const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;

    expiredAt.setSeconds(
        expiredAt.getSeconds() + Number(JWT_REFRESH_EXPIRATION)
    );

    const _token = v4();
    const _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });
    const refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    const isExpireToken = token.expiryDate.getTime() < new Date().getTime();
    return isExpireToken;
};

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export { RefreshToken };
