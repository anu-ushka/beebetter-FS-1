import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const app = express();

// ✅ Enable CORS (allow all origins)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Test route to verify POST works
app.post("/test", (req, res) => {
  console.log("✅ Test route hit", req.body);
  res.json({ message: "POST route working!" });
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "API running fine 🚀" });
});

export default app;
