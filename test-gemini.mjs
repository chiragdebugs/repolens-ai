import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: "Hello",
    });
    console.log("Success");
    console.log("text getter:", typeof response.text);
    console.log("text getter value:", response.text);
  } catch (e) {
    console.error("ERROR:");
    console.error(e);
  }
}

main();
