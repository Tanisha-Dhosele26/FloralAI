const { model } = require("../config/gemini");
const asyncHandler = require("../utils/asyncHandler");
const retry = require("../utils/retry");

const cache = new Map();

// ⏱️ timeout helper
const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini timeout")), ms)
    ),
  ]);
};

const generateFlowers = asyncHandler(async (req, res) => {
  const { occasion = "", relationship = "", personality = "" } = req.body;

  const prompt = `
Suggest 3 to 4 flowers for:
Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}

Rules:
- Return ONLY comma-separated flower names
- No explanation
`;

  try {
    console.log("🌼 Prompt:", prompt);

    // 🔥 CACHE
    if (cache.has(prompt)) {
      console.log("⚡ CACHE HIT");
      return res.json({ flowers: cache.get(prompt) });
    }

    // 🔥 GEMINI CALL (retry + timeout)
    const result = await retry(
      async () => {
        return await withTimeout(model.generateContent(prompt), 5000);
      },
      3,
      2000 // wait between retries
    );

    const response = result?.response;

    if (!response) {
      throw new Error("No response from Gemini");
    }

    const text = (await response.text()).trim();

    console.log("🤖 Gemini raw text:", text);

    const flowers = text
      .replace(/\n/g, "")
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (flowers.length === 0) {
      throw new Error("Empty flowers list");
    }

    // 🔥 CACHE SAVE
    cache.set(prompt, flowers);

    return res.json({ flowers });

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error.message);

    // ✅ FALLBACK FLOWERS (VERY IMPORTANT)
    const fallbackFlowers = [
      "Rose",
      "Lily",
      "Tulip",
      "Sunflower",
      "Daisy",
    ];

    return res.json({ flowers: fallbackFlowers });
  }
});

module.exports = { generateFlowers };
