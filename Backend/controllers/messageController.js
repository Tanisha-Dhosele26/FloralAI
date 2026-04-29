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

  let prompt;

  // 🌸 FLOWER GENERATION
  if (!flowers || flowers.length === 0) {
    prompt = `
Suggest 3 to 5 flowers for:

Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}

Return ONLY comma-separated flower names.
Example: Rose, Lily, Tulip
    `;
  }

  // 💌 MESSAGE GENERATION
  else {
    prompt = `
Write a ${style} style message for a bouquet.

Guidelines:
- Romantic → emotional ❤️
- Friendly → cheerful 😊
- Formal → respectful 🎩

Details:
Flowers: ${flowers.join(", ")}
Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}
Add-ons: ${(addOns || []).join(", ")}

Keep it short.
Return ONLY the message.
    `;
  }

  let text = "";

  try {
    const cacheKey = prompt;

    // 🔥 CACHE CHECK
    if (cache.has(cacheKey)) {
      console.log("⚡ CACHE HIT");
      return res.json({ message: cache.get(cacheKey) });
    }

    // 🔥 RETRY + TIMEOUT + GEMINI CALL
    const result = await retry(
      async () => {
        return await withTimeout(
          model.generateContent(prompt),
          5000
        );
      },
      3,
      1000
    );

    console.log("🤖 RAW GEMINI RESULT:", result);

    if (result?.response) {
      text = result.response.text();
    } else {
      throw new Error("Invalid Gemini response");
    }

    // 🔥 SAVE CACHE
    cache.set(cacheKey, text);

    return res.json({ message: text });

  } catch (aiError) {
    console.error("❌ GEMINI FINAL FAILURE:", aiError.message);

    // 🔥 FALLBACK
    if (!flowers || flowers.length === 0) {
      text = "Rose, Lily, Tulip";
    } else {
      text = "💐 Wishing you happiness, love, and beautiful moments!";
    }

    return res.json({ message: text });
  }
});

module.exports = { generateMessage };
