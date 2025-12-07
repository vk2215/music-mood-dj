import { generatePlaylistFromAI } from "../services/aiService.js";
import { createPlaylist, getPlaylist } from "../services/playlistService.js";

export async function generateMix(req, res) {
  try {
    const { moodPrompt } = req.body;

    if (!moodPrompt) {
      return res.status(400).json({ error: "Mood prompt is required" });
    }

    const aiPlaylist = await generatePlaylistFromAI(moodPrompt);

    const playlist = await createPlaylist(moodPrompt, aiPlaylist);

    const formattedPlaylist = {
      ...playlist.toObject(),
      tracks: playlist.tracks.map((track) => ({
        _id: track._id,
        title: track.title,
        filename: track.filename,
        url: track.url,
        mimetype: track.mimetype,
        duration: track.duration,
        genre: track.genre,
        bpm: track.bpm,
      })),
    };

    res.json({ message: "Playlist generated", playlist: formattedPlaylist });
  } catch (error) {
    console.error("Generate mix error:", error);
    res.status(500).json({ error: "Failed to generate playlist" });
  }
}

export async function getPlaylistById(req, res) {
  try {
    const { id } = req.params;

    const playlist = await getPlaylist(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const formattedPlaylist = {
      ...playlist.toObject(),
      tracks: playlist.tracks.map((track) => ({
        _id: track._id,
        title: track.title,
        filename: track.filename,
        url: track.url,
        mimetype: track.mimetype,
        duration: track.duration,
        genre: track.genre,
        bpm: track.bpm,
      })),
    };

    res.json(formattedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
}
