const { model } = require("../config/gemini");

const generateMessage = async (req, res) => {
  try {
    const { flowers, addOns, style } = req.body;

    const prompt = `
    Generate a ${style} message for a bouquet.

    Flowers: ${flowers}
    Add-ons: ${addOns}

    Keep it under 40 words and make it meaningful and match the tone of the selected style properly.
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