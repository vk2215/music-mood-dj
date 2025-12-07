import Playlist from "../models/Playlist.js";
import { incrementTrackUsage } from "./trackService.js";

export async function createPlaylist(moodPrompt, trackList) {
  const playlist = new Playlist({
    moodPrompt,
    tracks: trackList,
  });

  await playlist.save();

  for (const item of trackList) {
    await incrementTrackUsage(item.trackId);
  }

  return playlist;
}

export async function getPlaylist(id) {
  return Playlist.findById(id).populate("tracks.trackId");
}
