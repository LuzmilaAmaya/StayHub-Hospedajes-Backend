import express from "express";
import cors from "cors";
import routes from "../src/routes/index.js";
import { connectDB } from "../src/config/db.js"; // ajustá la ruta

const app = express();

await connectDB();

app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API funcionando en Vercel 🚀");
});

export default app;