import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { db } from "./models/index.js";
import { configDb } from "./common/db.config.js";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";

dotenv.config();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const corsOptions = {
    origin: process.env.CORS,
};

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("upload"));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const PORT = process.env.NODE_LOCAL_PORT;

db.mongoose
    .connect(`${configDb.URL}${configDb.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(
            `Successfully connect to MongoDB ==> ${configDb.HOST}:${configDb.PORT}/${configDb.DB}`
        );
        db.init();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

authRouter(app);
userRouter(app);
postRouter(app);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port and cors ${process.env.CORS}`);
});
