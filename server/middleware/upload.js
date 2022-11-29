import multer from "multer";
import { __dirname } from "../index.js";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "upload", "images"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${crypto.randomBytes(20).toString("hex")}.${file.mimetype.replace(
                "image/",
                ""
            )}`
        );
    },
});

const upload = multer({ storage });

export { upload };
