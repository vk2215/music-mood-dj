import Track from "../models/Track.js";

export async function createTrack({ title, filename, filepath, mimetype, duration, genre, bpm }) {
  const track = new Track({
    title,
    filename,
    filepath,
    mimetype,
    duration,
    genre,
    bpm
  });

  await track.save();
  return track;
}

export async function listTracks() {
  return Track.find().sort({ createdAt: -1 });
}

export async function incrementTrackUsage(trackId) {
  return Track.findByIdAndUpdate(trackId, { $inc: { usedCount: 1 } });
}
