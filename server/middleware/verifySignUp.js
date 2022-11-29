import { db } from "../models/index.js";

const checkDuplicateUserNameOrEmail = (req, res, next) => {
    const { username, email } = req.body;

    db.user
        .findOne({
            username,
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                return res.status(400).send({
                    message: "Failed! Username is already in use!",
                });
            }

            db.user
                .findOne({
                    email,
                })
                .exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (user) {
                        res.status(400).send({
                            message: "Failed! Email is already in use!",
                        });
                        return;
                    }
                });

            next();
        });
};

const checkRolesExisted = (req, res, next) => {
    const { roles } = req.body;

    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!db.ROLES.includes(roles[i])) {
                res.status(400).send({
                    message: `Failed! ${roles[i]} does not exist!`,
                });
                return;
            }
        }
    }

    next();
};

export { checkDuplicateUserNameOrEmail, checkRolesExisted };
