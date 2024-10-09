import dotenv from "dotenv";
import exprees from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Complented"))
  .catch((err) => console.log(err));

const app = exprees();

app.listen(3000, () => {
  console.log("Server is running on 3000 !!");
});
app.use(exprees.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
