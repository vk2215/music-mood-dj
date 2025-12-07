import React, { useState } from "react";
import api from "../api/api";

export default function MoodForm({ setPlaylist }) {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!mood) return alert("Please enter mood prompt");

    setLoading(true);

    try {
      const res = await api.post("/playlist/generate", { moodPrompt: mood });

      const playlist = res.data.playlist || [];

      setPlaylist(playlist);
      alert("Mix generated! Check Playlist Player section.");
    } catch (err) {
      console.error("Error generating playlist:", err);
      alert("Failed to generate playlist");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      <div>
        <label className="block mb-1">Mood Prompt</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="e.g. calm focus, romantic evening"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-semibold"
      >
        {loading ? "Generating..." : "Generate Mix"}
      </button>
    </form>
  );
}
