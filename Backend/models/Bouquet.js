const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema({
  name: String,
  image: String
});

const bouquetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  occasion: String,
  relationship: String,
  personality: String,

  flowers: [flowerSchema], // dynamic array

  addOns: [String], // or object if needed

  message: String,

  selectedCard: {
  id: String,
  name: String,
  bg: String,
  stickers: [String]
 },

  digitalBouquetUrl: {
  type: String,
  default: "generated URL here"
  }, // optional (PDF/image)

}, { timestamps: true });

module.exports = mongoose.model("Bouquet", bouquetSchema);
