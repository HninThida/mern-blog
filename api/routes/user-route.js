import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  singOut,
  getusers,
  getuserById,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/sign-out", singOut);
router.get("/get-users", verifyToken, getusers);
router.get("/:userId", getuserById);

export default router;
