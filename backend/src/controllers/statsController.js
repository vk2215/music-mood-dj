import Playlist from "../models/Playlist.js";
import { getRedis } from "../config/redis.js";

const CACHE_KEY = "top_tracks_cache";
const CACHE_TTL = 60;
export async function getTopTracks(req, res) {
  try {
    const redis = getRedis();

    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      const parsed = typeof cached === "string" ? JSON.parse(cached) : cached;
      return res.json(parsed);
    }

    const topTracks = await Playlist.aggregate([
      { $unwind: "$tracks" },
      { $group: { _id: "$tracks.trackId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "tracks",
          localField: "_id",
          foreignField: "_id",
          as: "track",
        },
      },
      { $unwind: "$track" },
      {
        $project: {
          _id: 0,
          trackId: "$track._id",
          title: "$track.title",
          filepath: "$track.filepath",
          usedCount: "$count",
        },
      },
    ]);

    await redis.set(CACHE_KEY, JSON.stringify(topTracks));
    await redis.expire(CACHE_KEY, CACHE_TTL);
    res.json(topTracks);
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to get top tracks" });
  }
}
