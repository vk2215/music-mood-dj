import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    moodPrompt: { type: String, required: true },

    tracks: [
      {
        trackId: { type: mongoose.Schema.Types.ObjectId, ref: "Track", required: true },
        order: { type: Number, required: true },
        weight: { type: Number, default: 1 } 
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema);
