// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express();

// import authRoutes from "./routes/authRoutes.js";


// app.use(
//   cors()
// );


// app.use(express.json());

// app.get("/hello",()=>console.log("first"))


// app.post("/test", (req, res) => {
//   console.log("Test route hit", req.body);
//   res.json({ message: "POST route working!" });
// });


// app.use("/api/auth", authRoutes);


// app.get("/", (req, res) => {
//   res.json({ message: "API running fine" });
// });

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
