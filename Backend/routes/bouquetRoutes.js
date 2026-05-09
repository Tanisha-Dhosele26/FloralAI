const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); 

const {
  createBouquet,
  updateAddOns,
  updateMessage,
  finalizeBouquet,
  getMyBouquets,
} = require("../controllers/bouquetControllers");

router.use(auth); // All routes below require auth

// CREATE
router.post("/", createBouquet);

// MY BOUQUETS
router.get("/my", getMyBouquets);

// UPDATE ADDONS
router.put("/:id/addons", updateAddOns);

// UPDATE MESSAGE
router.put("/:id/message", updateMessage);

// FINAL STEP
router.put("/:id/finalize", finalizeBouquet);

module.exports = router;
