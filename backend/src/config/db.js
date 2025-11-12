// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const connectDB = async () => {
//   try {
//     await prisma.$connect();
//     console.log('✅ Connected to MongoDB Atlas via Prisma');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error.message);
//     process.exit(1);
//   }
// };

// export default prisma;


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
