const { model } = require("../config/gemini");
const asyncHandler = require("../utils/asyncHandler");
const retry = require("../utils/retry");
const cache = new Map(); // 🔥 simple in-memory cache


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

Return ONLY flower names separated by commas.
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

Flowers: ${flowers.join(", ")}
Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}
Add-ons: ${(addOns || []).join(", ")}

Keep it short.
Return ONLY the message.
    `;
  }

  console.log("🧠 PROMPT SENT TO GEMINI:", prompt);

  let text = "";

  try {
    // 🔥 RETRY + TIMEOUT + GEMINI CALL
    const result = await retry(
      async () => {
        return await withTimeout(
          model.generateContent(prompt),
          5000 // ⏱️ 5 sec timeout
        );
      },
      3,      // 🔁 retries
      1000    // ⏳ initial delay
    );

    console.log("🤖 RAW GEMINI RESULT:", result);

    if (result && result.response) {
      text = result.response.text();
    } else {
      throw new Error("Invalid Gemini response");
    }

  } catch (aiError) {
    console.error("❌ GEMINI FINAL FAILURE:", aiError.message);

    const isQuotaError =
    aiError.message?.includes("Quota exceeded");

    if (isQuotaError) {
      console.warn("⚠️ Gemini quota exceeded → using fallback");
    } 

    // ✅ FALLBACK (safe UX)
    if (!flowers || flowers.length === 0) {
      text = "Rose, Lily, Tulip";
    } else {
      text = "💐 Wishing you happiness, love, and beautiful moments!";
    }
  }

  console.log("✅ FINAL TEXT SENT:", text);

  res.json({ message: text });
});

module.exports = { generateMessage };
