import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
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

// const PORT = process.env.PORT || 5001;
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

await connectDB();
console.log("Moongoose connected")



export default app;
