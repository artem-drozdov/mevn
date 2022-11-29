import jwt from "jsonwebtoken";
import { db } from "../models/index.js";

const { TokenExpiredError } = jwt;

const cacheError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(401)
            .send({ message: "Unauthorize! Access Token was expired!" });
    }

    return res.status(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const secret = process.env.JWT_SECRET_KEY;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return cacheError(err, res);
        }

        req.userId = decoded.id;
        next();
    });
};

const defineUser = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const secret = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            if (err instanceof TokenExpiredError) {
                return res.status(401).send({
                    message: "Unauthorize! Access Token was expired!",
                });
            } else {
                req.userId = null;
                next();
            }
        }
    });
};

const isAdmin = (req, res, next) => {
    const { userId } = req;

    db.user.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        db.role.find({ _id: { $in: user.roles } }, (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({ message: "Require admin role!" });
            return;
        });
    });
};

const isModerator = (req, res, next) => {
    const { userId } = req;

    db.user.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        db.role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Required Moderator Role!" });
                return;
            }
        );
    });
};

export { isAdmin, isModerator, verifyToken, defineUser };
