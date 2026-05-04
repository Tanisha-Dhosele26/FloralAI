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

const generateMessage = asyncHandler(async (req, res) => {
  console.log("🔥 REQUEST BODY:", req.body);

  const {
    flowers = [],
    addOns = [],
    style = "Romantic",
    occasion = "",
    relationship = "",
    personality = "",
  } = req.body;

  // 💌 PROMPT → generate MULTIPLE messages
  const prompt = `
Generate 3 different ${style} style messages for a flower bouquet .

Details:
Flowers: ${flowers.join(", ")}
Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}
Add-ons: ${(addOns || []).join(", ")}

Rules:
- Each message should be 2-3 lines
- Emotional and natural
- No numbering
- Separate each message with a newline

Return ONLY messages.
`;

  try {
    // 🔥 CACHE CHECK
    if (cache.has(prompt)) {
      console.log("⚡ CACHE HIT");
      return res.json({ messages: cache.get(prompt) });
    }

    // 🔥 GEMINI CALL
    const result = await retry(
      async () => {
        return await withTimeout(model.generateContent(prompt), 5000);
      },
      3,
      1000
    );

    const response = result?.response;

    if (!response) {
      throw new Error("No response from Gemini");
    }

    const text = (await response.text()).trim();

    console.log("🤖 GEMINI TEXT:", text);

    // ✅ CONVERT TEXT → ARRAY
    const messages = text
      .split("\n")
      .map((msg) => msg.trim())
      .filter((msg) => msg.length > 0);

    if (messages.length === 0) {
      throw new Error("Empty messages");
    }

    // 🔥 CACHE
    cache.set(prompt, messages);

    return res.json({ messages });

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error.message);

    // ✅ FALLBACK ARRAY
    const fallbackMessages = [
      `💐 Wishing you a beautiful ${occasion || "special"} filled with love and happiness!`,
      "🌸 May these flowers bring joy and warmth to your heart.",
      "💖 A little bouquet to brighten your day and make you smile.",
    ];

    return res.json({ messages: fallbackMessages });
  }
});

module.exports = { generateMessage };
