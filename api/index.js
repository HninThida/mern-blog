import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";
import postRoutes from "./routes/post-route.js";
import commentRoutes from "./routes/comment-route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const __dirname = path.resolve();
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Complented"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on 3000 !!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
