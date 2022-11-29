import dotenv from "dotenv";

dotenv.config();

const configDb = {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.DB_NAME,
    URL: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`,
};

export { configDb };
