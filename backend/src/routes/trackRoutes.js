import express from "express";
import { uploadTrack, getAllTracks } from "../controllers/trackController.js";
import { upload } from "../utils/uploader.js";

const router = express.Router();

router.post("/upload", upload.single("track"), uploadTrack);

router.get("/", getAllTracks);

export default router;
