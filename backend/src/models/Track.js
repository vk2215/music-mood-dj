import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    mimetype: { type: String, required: true },

    duration: { type: Number },
    genre: { type: String },
    bpm: { type: Number },

    usedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Track", trackSchema);
