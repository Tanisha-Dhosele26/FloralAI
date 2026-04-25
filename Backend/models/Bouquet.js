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

  gifts: [String], // or object if needed

  message: String,

  digitalBouquetUrl: String, // optional (PDF/image)

}, { timestamps: true });

module.exports = mongoose.model("Bouquet", bouquetSchema);
