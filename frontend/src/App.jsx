import React, { useState } from "react";
import TrackUpload from "./components/TrackUpload";
import TrackList from "./components/TrackList";
import MoodForm from "./components/MoodForm";
import PlaylistPlayer from "./components/PlaylistPlayer";
import TopTracks from "./components/TopTracks";

export default function App() {
  const [generatedPlaylist, setGeneratedPlaylist] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
        🎵 Music Mood DJ
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Upload Track</h2>
          <TrackUpload />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Available Tracks</h2>
          <TrackList />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Generate Mood Mix</h2>
          <MoodForm setPlaylist={setGeneratedPlaylist} />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Playlist Player</h2>
          {generatedPlaylist.length > 0 ? (
            <PlaylistPlayer playlist={generatedPlaylist} />
          ) : (
            <p className="text-gray-400">Generate a playlist to play it here.</p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top Tracks</h2>
        <TopTracks />
      </div>
    </div>
  );
}
