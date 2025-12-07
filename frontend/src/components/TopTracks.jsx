import { useEffect, useState } from "react";
import PlaylistPlayer from "./PlaylistPlayer";

function makePublicUrl(track) {
  if (!track) return "";
  if (track.url) {
    return track.url.startsWith("http")
      ? track.url
      : `https://music-mood-dj-s6lm.onrender.com/${track.url.replace(/^\/+/, "")}`;
  }
  if (track.filepath) {
    return track.filepath.startsWith("http")
      ? track.filepath
      : `https://music-mood-dj-s6lm.onrender.com/${track.filepath.replace(/^\/+/, "")}`;
  }
  if (track.filename) return `https://music-mood-dj-s6lm.onrender.com/uploads/${track.filename}`;
  return "";
}

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchTopTracks();
  }, []);

  async function fetchTopTracks() {
    setLoading(true);
    try {
      const res = await fetch("https://music-mood-dj-s6lm.onrender.com/api/stats/top-tracks");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch top tracks");
        setLoading(false);
        return;
      }

      const playlist = data.map((t) => ({
        title: t.title || t.name || t.filename,
        url: makePublicUrl(t),
      }));

      setTracks(playlist);
      setLoading(false);
    } catch (err) {
      console.error("Top tracks error:", err);
      setError("Network error");
      setLoading(false);
    }
  }

  if (loading) return <p className="text-white">Loading top tracks...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-3">Top Tracks</h2>

      <div className="space-y-2 mb-6">
        {tracks.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`p-3 rounded-md cursor-pointer ${
              selected === i ? "bg-blue-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {t.title}
          </div>
        ))}
      </div>

      <PlaylistPlayer playlist={tracks} startIndex={selected} />
    </div>
  );
}
