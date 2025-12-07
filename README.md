# 🎵 Mood DJ — AI Music Mix Generator

Mood DJ is an AI-powered music mixer where users can upload tracks, generate playlists based on mood prompts, and play mixes in the browser.

## 🚀 Features
- Upload MP3/WAV files
- Store metadata in MongoDB/PostgreSQL
- Generate playlists using an LLM
- Save mixes in DB
- Track usage count of each track
- Cached **/stats/top-tracks** API using Redis or in-memory TTL cache
- Simple UI to upload, play, generate mixes, and view top tracks

## 📂 Tech Stack
Backend: Node.js/Express, MongoDB/PostgreSQL, Redis (optional)
AI: OpenAI API
Frontend: React/Next.js
Deployment: Vercel (frontend) + Render/Railway/Vercel (backend)

## 🏗️ Setup
git clone <repo-url>
cd mood-dj
npm install

## 🌐 Environment Variables
DB_URL=your_db_url
REDIS_URL=your_redis_url (optional)
OPENAI_API_KEY=your_key

## ▶️ Run Project
npm run dev      # backend
npm run start    # frontend

## 📘 API Endpoints
POST /upload           → upload audio
GET /tracks            → list tracks
POST /generate-mix     → generate playlist
GET /stats/top-tracks  → cached top tracks

## 🎥 Demo Steps
1. Upload audio
2. Enter mood prompt
3. Generate AI mix
4. Play playlist
5. Show Top Tracks

## 📄 License
MIT
