import express from "express";
import {
  createComment,
  getPostComment,
  likeComment,
  editComment
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();
router.post("/create", verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComment);
router.put("/like-comment/:commentId", verifyToken, likeComment);
router.put("/like-comment/:commentId", verifyToken, likeComment);
router.put("/edit-comment/:commentId", verifyToken, editComment);

export default router;
