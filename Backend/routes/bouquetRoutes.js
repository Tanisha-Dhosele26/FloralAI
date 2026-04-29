const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
router.use(auth); 

const {
  createBouquet,
  updateAddOns,
  updateMessage,
  finalizeBouquet,
} = require("../controllers/bouquetControllers");

// CREATE
router.post("/", createBouquet);

// UPDATE ADDONS
router.put("/:id/addons", updateAddOns);

// UPDATE MESSAGE
router.put("/:id/message", updateMessage);

// FINAL STEP
router.put("/:id/finalize", finalizeBouquet);

module.exports = router;
