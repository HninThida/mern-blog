import express from "express";
import {
  createPost,
  updatePost,
  getposts,
  deletePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();
router.post("/create", verifyToken, createPost);
router.put("/update/:postId", verifyToken, updatePost);
router.get("/", getposts);
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
