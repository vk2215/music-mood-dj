import axios from "axios";

const api = axios.create({
  baseURL: "https://music-mood-dj-s6lm.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
