const allAccess = (req, res) => {
    res.status(200).send("Public Content for all users.");
};

const userBoard = (req, res) => {
    res.status(200).send("User Content for authorize users.");
};

const adminBoard = (req, res) => {
    res.status(200).send("Admin Content for admin in this app.");
};

const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content for moderator this app.");
};

export { allAccess, userBoard, adminBoard, moderatorBoard };
