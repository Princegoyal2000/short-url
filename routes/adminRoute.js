const express = require("express");
const router = express.Router();
const { renderAdminUI } = require("../controllers/staticURLControl");

router.get("/", renderAdminUI);

module.exports = router;
