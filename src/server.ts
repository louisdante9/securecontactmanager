import express, {Application, json, urlencoded} from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT, 10) || 8000;
app.disable("x-powered-by");
app.use(json(), urlencoded({ extended: false }), morgan("dev"), cors());
app.get("/", (req, res) =>
  res.send("Secure Contact Manager Server is awesome!!!")
);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
