import express from "express";
import cors from "cors";
import routes from "../src/routes/index.js";
import { connectDB } from "../src/config/db.js";

const app = express();

let dbConnected = false;

const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

app.use(async (req, res, next) => {
  await ensureDB();
  next();
});

app.use(
  cors({
    origin: [
      "https://stay-hub-hospedajes-fronted-fwp5.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

app.use("/api", routes);

export default app;