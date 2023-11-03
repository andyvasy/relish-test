const express = require("express");
const { getPitch } = require("../src/openAiService");
const router = express.Router();

router.get("/image-pitch/:id", async function (req, res, next) {
  res.json({ text: await getPitch(req.params.id) });
});

module.exports = router;
