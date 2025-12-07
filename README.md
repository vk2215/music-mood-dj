# 🎵 Music Mood DJ

A simple AI-powered music mixer where users upload songs, enter a mood prompt, and get an auto-generated playlist.

## Features
- Upload MP3/WAV files
- List & play tracks in browser
- Mood prompt → LLM generates 3–6 track playlist
- Playlist saved in DB + updates track usage count
- `/stats/top-tracks` shows most-used tracks (cached with Redis or TTL)

## Tech Stack
Node.js + Express, MongoDB/PostgreSQL, Redis, OpenAI API, React frontend, Vercel deploy.

## API
POST /tracks/upload — upload audio  
GET /tracks — list tracks  
GET /tracks/:id/stream — audio playback  
POST /mix/generate — mood → playlist  
GET /playlists/:id — get playlist  
GET /stats/top-tracks — top tracks (cached)

## Env Variables
PORT=3000  
MONGODB_URI=... / DATABASE_URL=...  
REDIS_URL=...  
OPENAI_API_KEY=...  
UPLOAD_DIR=./uploads

## Run Locally
npm install  
cp .env.example .env  
mkdir uploads  
npm run dev  
cd frontend && npm install && npm run dev

## Deployment (Vercel)
- Frontend in /frontend  
- Backend in /api or serverless handlers  
- Use external storage (S3) for audio  
- Add env vars in Vercel dashboard

## Demo Flow
Upload → Enter mood → Generate playlist → Play tracks → View top tracks
