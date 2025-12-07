import React from "react";
import TrackUpload from "../components/TrackUpload";
import TrackList from "../components/TrackList";
import MoodForm from "../components/MoodForm";
import PlaylistPlayer from "../components/PlaylistPlayer";
import TopTracks from "../components/TopTracks";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">🎵 Music Mood DJ</h1>

      <TrackUpload />
      <TrackList />
      <MoodForm setPlaylist={() => {}} />
      <TopTracks />
    </div>
  );
}
