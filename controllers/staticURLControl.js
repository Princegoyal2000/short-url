const URL = require("../models/url");

async function renderUI(req, res) {
  // console.log("req.user", req.user);
  // if (!req.user) return res.redirect("/login");
  //
  const allURLS = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allURLS,
  });
}

async function renderAdminUI(req, res) {
  const allURLS = await URL.find({});
  return res.render("home", {
    urls: allURLS,
  });
}

async function renderSignUpUI(req, res) {
  return res.render("signUp");
}

async function renderLoginUI(req, res) {
  return res.render("login");
}

module.exports = {
  renderUI,
  renderSignUpUI,
  renderLoginUI,
  renderAdminUI,
};
