const express = require("express");
const { getPitch } = require("../src/openAiService");
const router = express.Router();

/* GET salling pitch by photo id */
router.get("/photo-pitch/:id", async function (req, res, next) {
  try {
    res.json({ text: await getPitch(req.params.id) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
