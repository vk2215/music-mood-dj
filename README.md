# 🎵✨ Music Mood DJ — AI Powered Playlist Generator

Create mood-based music mixes using **AI**, upload your own tracks, and play everything directly in the browser!

---

## 🌟 Features Overview
- 🎧 Upload **MP3/WAV** files  
- 📃 List & stream uploaded tracks  
- 🤖 Enter a **mood prompt** → AI generates a 3–6 track playlist  
- 🗂️ Playlists saved in DB  
- 🔢 Tracks automatically get **usage counts**  
- 🚀 `/stats/top-tracks` returns most-used tracks with **Redis / TTL caching**  
- 🖥️ Simple React UI for upload → mix generation → playback → top tracks  

---

## 🧱 Tech Stack
- **Backend:** Node.js + Express  
- **Database:** MongoDB / PostgreSQL  
- **Cache:** Redis (or fallback to in-memory TTL)  
- **AI:** OpenAI API  
- **Frontend:** React + Tailwind  
- **Deployment:** Vercel  

---

## ⚙️ Setup (Local Development)
1. 📥 Clone the repo  
   `git clone <repo-url>`

2. 📦 Install backend dependencies  
   `npm install`

3. 🗂️ Copy environment file  
   `cp .env.example .env`

4. 🎶 Create uploads folder  
   `mkdir uploads`

5. ▶️ Start backend  
   `npm run dev`

6. 💻 Start frontend  
    `cd frontend
    npm install
    npm run dev`

## 🎥 Demo Workflow
1. Upload your songs  
2. Type a mood: *“calm focus”, “romantic evening”*  
3. AI generates a playlist  
4. Play tracks directly  
5. Check **Top Tracks** analytics  
