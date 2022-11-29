const requireRequestBodySignUp = (req, res, next) => {
    const { username, password, email } = req.body;

    if (!username) {
        return res.status(400).send({ message: "Missing username in data!" });
    } else if (!password) {
        return res.status(400).send({ message: "Missing password in data!" });
    } else if (!email) {
        return res.status(400).send({ message: "Missing email in data!" });
    }

    next();
};

const requireRequestBodySignIn = (req, res, next) => {
    const { username, password } = req.body;

    if (!password) {
        return res.status(400).send({ message: "Missing password in data!" });
    } else if (!username) {
        return res.status(400).send({ message: "Missing username in data!" });
    }

    next();
};

const requireRequestBodyUpdatePost = (req, res, next) => {
    const { body } = req;

    if (!body.title || !body.description) {
        return res
            .status(400)
            .send({ message: "Fields title and description can't be empty" });
    }

    next();
};

export {
    requireRequestBodySignIn,
    requireRequestBodySignUp,
    requireRequestBodyUpdatePost,
};
