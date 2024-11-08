import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import { routes } from "./routes/routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan('combined'))
app.use(cors());
app.use(json());
app.use(routes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Servidor rodando:" + PORT));
