import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { routes } from "./routes";
import { notFoundError, errorHandler } from "./utils/errors/globalErrorHandler";




config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT, 10) || 8000;
app.disable("x-powered-by");

app.use(json(), urlencoded({ extended: false }), morgan("dev"), cors());
app.use("/v1", routes(express));
app.use(notFoundError,errorHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
