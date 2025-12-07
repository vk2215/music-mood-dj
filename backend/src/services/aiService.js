import OpenAI from "openai";
import { ENV } from "../config/env.js";
import Track from "../models/Track.js";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

/**
 * Clean AI response: remove markdown code fences and extra spaces
 * @param {string} text
 * @returns {string} cleaned JSON string
 */
function cleanAIJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

/**
 * Generate a playlist from AI based on mood prompt and available tracks
 * @param {string} moodPrompt
 * @returns {Promise<Array<{trackId: string, order: number, weight: number}>>}
 */
export async function generatePlaylistFromAI(moodPrompt) {
  const tracks = await Track.find();
  if (!tracks || tracks.length === 0) {
    throw new Error("No tracks available to generate playlist");
  }

  const trackListForAI = tracks
    .map(
      (t, i) =>
        `${i + 1}. ${t.title} (id: ${t._id}, bpm: ${t.bpm || "?"}, genre: ${
          t.genre || "?"
        })`
    )
    .join("\n");

  const prompt = `
You are a music mood DJ.
User mood: "${moodPrompt}"

Available tracks:
${trackListForAI}

Select 3–6 tracks that best match the mood.
Return ONLY valid JSON in this format (no markdown or explanations):

[
  { "trackId": "id_here", "order": 1, "weight": 0.9 },
  { "trackId": "id_here", "order": 2, "weight": 0.7 }
]
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const rawText = response.choices[0].message.content;
    const jsonText = cleanAIJSON(rawText);
    const playlist = JSON.parse(jsonText);

    if (!Array.isArray(playlist)) {
      console.error("AI returned invalid playlist format:", jsonText);
      throw new Error("AI did not return valid JSON array");
    }

    return playlist;
  } catch (error) {
    console.error("AI JSON Parse Error:", error.message);
    throw new Error("Failed to generate playlist from AI");
  }
}

export function generateMockPlaylist(tracks) {
  const shuffled = tracks.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(5, shuffled.length));

  return selected.map((t, i) => ({
    trackId: t._id.toString(),
    order: i + 1,
    weight: parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
  }));
}
