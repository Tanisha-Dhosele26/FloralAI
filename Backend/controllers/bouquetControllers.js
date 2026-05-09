const Bouquet = require("../models/Bouquet.js");
const asyncHandler = require("../utils/asyncHandler");

// 🔥 CREATE
exports.createBouquet = asyncHandler(async (req, res) => {
  const {
    occasion,
    relationship,
    personality,
    flowers,
    addOns,
    message,
    selectedCard,
  } = req.body;

  const bouquet = await Bouquet.create({
    user: req.user.id,
    occasion,
    relationship,
    personality,
    flowers: flowers || [],
    addOns: addOns || [],
    message,
    selectedCard, // ✅ correctly saved
  });

  res.status(201).json({
    success: true,
    bouquetId: bouquet._id,
  });
});


// 🔥 UPDATE ADD-ONS
exports.updateAddOns = asyncHandler(async (req, res) => {
  const bouquet = await Bouquet.findById(req.params.id);

  if (!bouquet) {
    const err = new Error("Bouquet not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔒 Ownership check
  if (bouquet.user.toString() !== req.user.id) {
    const err = new Error("Not authorized");
    err.statusCode = 403;
    throw err;
  }

  bouquet.addOns = req.body.addOns;
  bouquet.status = "customized";

  await bouquet.save();

  res.json({
    success: true,
    bouquet,
  });
});


// 🔥 UPDATE MESSAGE
exports.updateMessage = asyncHandler(async (req, res) => {
  const bouquet = await Bouquet.findById(req.params.id);

  if (!bouquet) {
    const err = new Error("Bouquet not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔒 Ownership check
  if (bouquet.user.toString() !== req.user.id) {
    const err = new Error("Not authorized");
    err.statusCode = 403;
    throw err;
  }

  bouquet.message = req.body.message;

  await bouquet.save();

  res.json({
    success: true,
    bouquet,
  });
});


// 🔥 FINALIZE
exports.finalizeBouquet = asyncHandler(async (req, res) => {
  const bouquet = await Bouquet.findById(req.params.id);

  if (!bouquet) {
    const err = new Error("Bouquet not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔒 Ownership check
  if (bouquet.user.toString() !== req.user.id) {
    const err = new Error("Not authorized");
    err.statusCode = 403;
    throw err;
  }

  // ✅ ONLY MARK COMPLETED (NO URL REQUIRED)
  bouquet.status = "completed";

  await bouquet.save();

  res.json({
    success: true,
    bouquet,
  });
});


// my bouquet
exports.getMyBouquets = asyncHandler(async (req, res) => {
  const bouquets = await Bouquet.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.json(bouquets);
});