import express from "express";
import {
  generateMix,
  getPlaylistById,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/generate", generateMix);

router.get("/:id", getPlaylistById);

export default router;
