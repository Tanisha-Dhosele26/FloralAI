const { model } = require("../config/gemini");

const generateMessage = async (req, res) => {
  try {
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
Suggest 2 to 4 flowers for:

Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}

Return ONLY comma-separated flower names.
Example: Rose, Lily, Tulip
      `;
    }

    // 💌 MULTIPLE MESSAGE GENERATION (UPGRADED)
    else {
      prompt = `
Generate 3 ${style} bouquet messages.

Guidelines:
- Romantic → emotional ❤️
- Friendly → cheerful 😊
- Formal → respectful 🎩

Details:
Flowers: ${flowers.join(", ")}
Occasion: ${occasion}
Relationship: ${relationship}
Personality: ${personality}
Add-ons: ${(addOns || []).join(", ") || "none"}

Rules:
- Keep each message short (2-3 lines)
- Make each message unique
- Return ONLY in this format:

1. message one
2. message two
3. message three
      `;
    }

    let text = "";

    try {
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        text = result.response.text();
      } else {
        throw new Error("Invalid Gemini response");
      }

    } catch (aiError) {
      console.error("Gemini Error:", aiError.message);

      // 🔥 FALLBACK SAFE
      if (!flowers || flowers.length === 0) {
        return res.json({
          flowers: ["Rose", "Lily", "Tulip"],
        });
      } else {
        return res.json({
          messages: [
            "💐 Wishing you happiness and beautiful moments!",
            "🌸 May your day be filled with love and smiles!",
            "✨ Sending warmth, joy, and heartfelt wishes!",
          ],
        });
      }
    }

    // 🌸 RETURN FLOWERS
    if (!flowers || flowers.length === 0) {
      const flowerList = text
        .replace(/\n/g, "")
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);

      return res.json({ flowers: flowerList });
    }

    // 💌 RETURN MULTIPLE MESSAGES
    const messages = text
      .split(/\d+\./)
      .map((m) => m.trim())
      .filter((m) => m);

    res.json({ messages });

  } catch (error) {
    console.error("Server Error:", error.message);

    res.status(500).json({
      message: "Server error. Please try again.",
    });
  }
};

module.exports = { generateMessage };