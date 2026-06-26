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

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "stayhub",
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("MongoDB conectado ✅");
  })
  .catch((error) => {
    console.error("Error MongoDB ❌", error);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;