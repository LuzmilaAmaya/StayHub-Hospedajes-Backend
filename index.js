import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";
import cors from "cors";


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado ✅");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT} 🔥`),
    );
  })
  .catch((error) => {
    console.error("Error MongoDB ❌", error);
  });
