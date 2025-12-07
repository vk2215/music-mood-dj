import { createTrack, listTracks } from "../services/trackService.js";

export async function uploadTrack(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, mimetype, filename } = req.file;

    const track = await createTrack({
      title: originalname,
      filename,
      filepath: `/uploads/${filename}`,
      mimetype
    });

    res.json({ message: "Track uploaded", track });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Track upload failed" });
  }
}

export async function getAllTracks(req, res) {
  try {
    const tracks = await listTracks();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
}
