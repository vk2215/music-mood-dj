import React, { useEffect, useState } from "react";
import api from "../api/api";

function makePublicUrl(track) {
  if (track.url) {
    if (track.url.startsWith("http")) return track.url;
    return `http://localhost:5000/${track.url.replace(/^\/+/, "")}`;
  }
  if (track.filepath) {
    if (track.filepath.startsWith("http")) return track.filepath;
    return `http://localhost:5000/${track.filepath.replace(/^\/+/, "")}`;
  }
  if (track.filename) {
    return `http://localhost:5000/uploads/${track.filename}`;
  }
  return "";
}

export default function TrackList() {
  const [tracks, setTracks] = useState([]);

  async function loadTracks() {
    try {
      const res = await api.get("/files");
      setTracks(res.data);
    } catch (err) {
      console.error("Error loading tracks:", err);
    }
  }

  useEffect(() => {
    loadTracks();
  }, []);

  return (
    <div className="space-y-3">
      {tracks.length === 0 ? (
        <p className="text-gray-400">No tracks uploaded yet.</p>
      ) : (
        tracks.map((track) => (
          <div
            key={track._id || track.id || track.filename}
            className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded"
          >
            <span>{track.title || track.filename}</span>
            <audio controls className="h-8">
              <source src={makePublicUrl(track)} />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))
      )}
    </div>
  );
}
