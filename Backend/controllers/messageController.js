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

    // 🔥 GEMINI CALL (SAFE)
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

      // ✅ FALLBACK (NO CRASH)
      if (!flowers || flowers.length === 0) {
        text = "Rose, Lily, Tulip"; // fallback flowers
      } else {
        text = "💐 Wishing you happiness, love, and beautiful moments!";
      }
    }

    res.json({ message: text });

  } catch (error) {
    console.error("Server Error:", error.message);

    res.status(500).json({
      message: "Server error. Please try again.",
    });
  }
};

module.exports = { generateMessage };