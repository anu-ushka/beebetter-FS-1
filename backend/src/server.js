import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

await connectDB();
console.log("Moongoose connected")

export default app;
