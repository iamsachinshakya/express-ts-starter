import express, { Request, Response } from "express";
import { stream } from "./utils/logger";
import morgan from "morgan";
import { env, isDevelopment } from "./config/env";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(morgan(isDevelopment ? "dev" : "combined", { stream }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World 🌍" });
});

export default app;
