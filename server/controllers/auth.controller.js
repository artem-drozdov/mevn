import { db } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import { formateUser } from "../helpers/formateUser.js";

const BASE_URL = process.env.BASE_IMAGE_URL || "http://localhost:8081/images/";

const signUp = (req, res) => {
    const { username, email, password, roles } = req.body;
    const user = new db.user({
        username,
        email,
        avatar: null,
        password: bcrypt.hashSync(password, 8),
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (roles) {
            db.role.find(
                {
                    name: { $in: roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({
                            message: "User was registered successfully!",
                        });
                    });
                }
            );
        } else {
            db.role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

const signIn = (req, res) => {
    const secret = process.env.JWT_SECRET_KEY;
    const lifetimeToken = process.env.JWT_EXPIRATION;
    const { username, password } = req.body;

    db.user
        .findOne({
            username,
        })
        .populate("roles", "-__v")
        .exec(async (err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!",
                });
            }

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: Number(lifetimeToken),
            });
            const refreshToken = await db.refreshToken.createToken(user);

            res.status(200).send({
                ...formateUser(user),
                accessToken: token,
                refreshToken,
            });
        });
};

const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    const secret = process.env.JWT_SECRET_KEY;
    const lifetimeToken = process.env.JWT_EXPIRATION;

    if (requestToken === null) {
        return res.status(403).send({ message: "Refresh Token is required!" });
    }

    try {
        const refreshToken = await db.refreshToken.findOne({
            token: requestToken,
        });

        if (!refreshToken) {
            return res
                .status(403)
                .send({ message: "Refresh token is not in database!" });
        }

        if (db.refreshToken.verifyExpiration(refreshToken)) {
            db.refreshToken.findByIdAndRemove(refreshToken._id, {
                useFindAndModify: false,
            });

            return res.status(403).send({
                message:
                    "Refresh Token was expired. Please make a new signin request!",
            });
        }

        const newAccessToken = jwt.sign({ id: refreshToken.user._id }, secret, {
            expiresIn: Number(lifetimeToken),
        });

        return res.status(200).send({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

const getUser = (req, res) => {
    const { userId } = req;

    db.user
        .findById(userId)
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            return res.status(200).send(formateUser(user));
        });
};

const changeProfile = async (req, res) => {
    const { body, userId, file } = req;

    try {
        const user = await db.user.findById(userId).populate("roles", "-__v");
        let newAvatar = null;

        if (file) {
            newAvatar = BASE_URL + file.filename;
            body.avatar = newAvatar;
        }

        if (user.avatar && newAvatar) {
            const pathOldAvatar = user.avatar.split("/images/")[1];

            await fs.unlink(`upload/images/${pathOldAvatar}`, (err) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
            });
        }

        for (let key in body) {
            user[key] = body[key];
        }

        user.save().then((user) => {
            return res.status(200).send(user);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { signIn, signUp, getUser, refreshToken, changeProfile };
