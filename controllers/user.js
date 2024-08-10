const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      err: "Invlaid username or password",
    });

  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);

  console.log("checking the login process");
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
