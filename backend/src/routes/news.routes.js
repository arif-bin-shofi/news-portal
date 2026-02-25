import express from "express";
import {
  getAllNews,
  getTopNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getUserNews,
} from "../controllers/news.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { uploadNewsImage } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/top", getTopNews);

router.post("/", verifyToken, uploadNewsImage.single("image"), createNews);
router.get("/user/my-news", verifyToken, getUserNews);
router.put("/:id", verifyToken, uploadNewsImage.single("image"), updateNews);
router.delete("/:id", verifyToken, deleteNews);

router.get("/:id", getNewsById);

export default router;
