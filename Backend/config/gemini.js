const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = {
  generateContent: async (prompt) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",   // ✅ USE THIS
      contents: prompt,
    });

    return {
      response: {
        text: () => response.text,
      },
    };
  },
};

module.exports = { model };