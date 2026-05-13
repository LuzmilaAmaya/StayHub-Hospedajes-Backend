import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado ✅");
  })
  .catch((error) => {
    console.error("Error MongoDB ❌", error);
  });

export default app;