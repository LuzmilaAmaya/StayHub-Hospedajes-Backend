import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import routes from "../src/routes/index.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// ruta prueba
app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((error) => console.error("Error MongoDB ❌", error));

export default app;