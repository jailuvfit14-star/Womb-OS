
import { GoogleGenAI } from "@google/genai";
import { User, Archetype, SoilState } from "./types";
import { ROOT_WOUNDS } from "./constants";

export async function generateDailyGuidance(user: User): Promise<string> {
  const latestCheckIn = user.dailyCheckIns[0];
  const cycleDay = latestCheckIn?.cycleDay || 1;
  const phase = latestCheckIn?.phase || Archetype.MAIDEN;
  const soilState = latestCheckIn?.soilState || SoilState.NUTRIENT_DENSE;
  const energy = latestCheckIn?.energyLevel || 5;

  const activeWoundsNames = user.activeRootWounds
    .map(id => ROOT_WOUNDS.find(w => w.id === id)?.name)
    .filter(Boolean);

  const prompt = `
    Context: Womb OS - Cyclical Life Operating System for a female entrepreneur.
    User current state:
    - Cycle Day: ${cycleDay}
    - Phase: ${phase}
    - Soil State (Nervous system state): ${soilState}
    - Energy Level (1-10): ${energy}
    - Active Root Wounds (Shadow traits): ${activeWoundsNames.join(", ")}

    Task: Generate a luxurious, mystical, yet business-strategic guidance message.
    Guidelines:
    - Max 100 words.
    - Start with "Beloved," or similar elegant address.
    - Connect their biological energy (phase) with their business strategy.
    - Address the root wound gently.
    - End with a powerful reflective question.

    Example Tone: "Your Spring energy is asking you to BUILD today. But your Unworthiness wound whispers 'who are you to create this?' What if you built AS IF you're already worthy? What would you make if you knew it couldn't fail?"
  `;

  try {
    // Initializing with correct named parameter and direct environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "May your cycle guide your soul today. Focus on inner alignment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stars are silent right now. Trust your own internal rhythm.";
  }
}

export async function askOracle(question: string, user: User): Promise<string> {
  const latestCheckIn = user.dailyCheckIns[0];
  const phase = latestCheckIn?.phase || Archetype.MAIDEN;
  const soilState = latestCheckIn?.soilState || SoilState.NUTRIENT_DENSE;

  const prompt = `
    User Question: "${question}"
    System: Womb OS - Cyclical Life Operating System.
    User State: ${phase}, Soil: ${soilState}.
    Answer as a wise ancestral mentor who understands modern business. 
    Keep it poetic, luxurious, and highly strategic.
  `;

  try {
    // Initializing with correct named parameter and direct environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Your wisdom lies within.";
  } catch (error) {
    return "Oracle connection interrupted. Sit in silence for a moment.";
  }
}
