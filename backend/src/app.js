import express from "express";
import cors from "cors";
import trackRoutes from "./routes/trackRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/files", trackRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/stats", statsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
