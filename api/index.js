import express from "express";
import cors from "cors";
import routes from "../src/routes/index.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://stay-hub-hospedajes-fronted-fwp5.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

app.use("/api", routes);

export default app;
