import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

// DB + Server
const PORT = process.env.PORT || 3000;

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
