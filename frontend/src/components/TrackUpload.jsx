import React, { useState } from "react";
import api from "../api/api";

export default function TrackUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file || !title) return alert("Please enter title and select file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("track", file); 

    try {
      await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Track uploaded!");
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <label className="block mb-1">Track Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Enter track name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Select Music File</label>
        <input
          type="file"
          accept="audio/mp3, audio/wav, audio/*"
          className="w-full text-sm"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
      >
        Upload Track
      </button>
    </form>
  );
}
