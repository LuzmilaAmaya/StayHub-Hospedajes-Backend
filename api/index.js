import express from "express";
import cors from "cors";
import routes from "../src/routes/index.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

app.use("/api", routes);

export default app;
