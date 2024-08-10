const express = require("express");
const router = express.Router();
const {
  handleGenerateShortURL,
  getAnalyticsOfUrl,
} = require("../controllers/url");

router.post("/", handleGenerateShortURL);
router.get("/analytics/:shortId", getAnalyticsOfUrl);
module.exports = router;
