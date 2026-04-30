const express = require("express");
const router = express.Router();
const { generateFlowers } = require("../controllers/flowerController");

router.post("/generate", generateFlowers);

module.exports = router;
