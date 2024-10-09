import express from "express";
import { createPost, getposts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();
router.post("/create", verifyToken, createPost);
router.get("/", getposts);

export default router;
