import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Hello",
    });
    console.log("Success flash");
  } catch (e) {
    console.error(e);
  }
}

main();
