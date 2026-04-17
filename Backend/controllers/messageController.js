const { model } = require("../config/gemini");

const generateMessage = async (req, res) => {
  try {
    const { flowers, addOns, style } = req.body;

    const prompt = `
    Generate a short, emotional bouquet message.

    Flowers: ${flowers}
    Add-ons: ${addOns}
    Style: ${style}

    Keep it under 40 words and make it meaningful.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ message: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Message generation failed" });
  }
};

module.exports = { generateMessage };    