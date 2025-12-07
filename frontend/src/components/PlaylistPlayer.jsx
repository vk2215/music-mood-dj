import { useEffect, useRef, useState } from "react";

export default function PlaylistPlayer({ playlist = [], startIndex = 0 }) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = playlist[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    setProgress(0);
    if (currentTrack?.url) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current || isNaN(audioRef.current.duration)) return;
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    setProgress(value);
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
    setIsPlaying(true);
  };

  const handleEnded = () => {
    playNext();
  };

  if (!playlist || playlist.length === 0) {
    return <p className="text-gray-400">No playlist loaded</p>;
  }

  return (
    <div className="p-5 bg-gray-900 text-white rounded-xl max-w-md mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-3">Playlist Player</h2>

      <p className="text-sm text-gray-300 mb-2">
        Now Playing:{" "}
        <span className="font-semibold">
          {currentTrack?.title || "Unknown Track"}
        </span>
      </p>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source src={currentTrack?.url} />
      </audio>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full cursor-pointer mb-4"
      />

      <div className="flex gap-4 justify-center">
        <button
          onClick={playPrevious}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          ⏮ Prev
        </button>
        <button
          onClick={() => currentTrack?.url && setIsPlaying(!isPlaying)}
          disabled={!currentTrack?.url}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={playNext}
          className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Next ⏭
        </button>
      </div>
    </div>
  );
}
