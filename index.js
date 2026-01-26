import express from "express";
import roomRoutes from "./routes/room.routes.js";

const app = express();

app.use(express.json());
app.use("/api/rooms", roomRoutes);

export default app;
