import express from "express";
import { createComment ,getPostComment} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();
router.post("/create", verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComment);

export default router;
