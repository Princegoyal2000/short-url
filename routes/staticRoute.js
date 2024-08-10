const express = require("express");
const router = express.Router();
const {
  renderUI,
  renderSignUpUI,
  renderLoginUI,
} = require("../controllers/staticURLControl");
const { restrictTo } = require("../middlewares/auth");

router.get("/", restrictTo(["NORMAL", "ADMIN"]), renderUI);
router.get("/signup", renderSignUpUI);
router.get("/login", renderLoginUI);
module.exports = router;
