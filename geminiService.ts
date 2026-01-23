
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
    Context: Womb OS - Luxury Cyclical Operating System for High-Level Entrepreneurs.
    User current state:
    - Cycle Day: ${cycleDay}
    - Phase: ${phase}
    - Soil State: ${soilState}
    - Energy Level (1-10): ${energy}
    - Active Root Wounds: ${activeWoundsNames.join(", ")}
    - Business Revenue this Cycle: $${user.businessMetrics.currentCycleRevenue}

    Task: Generate a luxurious, strategic, and ancestral guidance message.
    Guidelines:
    - Max 100 words.
    - Style: Elegant, expensive, soulful, and business-focused.
    - Recommendation: Suggest how they should handle their revenue goals or content based on their current ${phase} phase.
    - Tone: You are a high-level concierge for their soul and business.

    Example Tone: "Beloved, your Maiden energy is peaking today—a perfect time to finalize those high-ticket contracts. Yet your Unworthiness wound may suggest you aren't ready. Anchor into your $15k revenue goal. What would the versions of you that already owns it do right now?"
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Your current alignment is your greatest asset. Proceed with devotion.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The oracle is refining her vision. Trust your inner rhythm.";
  }
}

export async function askOracle(question: string, user: User): Promise<string> {
  const latestCheckIn = user.dailyCheckIns[0];
  const phase = latestCheckIn?.phase || Archetype.MAIDEN;
  const soilState = latestCheckIn?.soilState || SoilState.NUTRIENT_DENSE;

  const prompt = `
    User Question: "${question}"
    System: Womb OS.
    Current State: ${phase}, Soil: ${soilState}.
    Answer as a world-class CEO mentor who is also an oracle. 
    Luxurious, concise, and highly strategic.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Seek the answer in the silence of your next breath.";
  } catch (error) {
    return "Oracle connection interrupted. Sit in silence for a moment.";
  }
}
