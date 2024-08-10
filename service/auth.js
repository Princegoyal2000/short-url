// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "Prince1234";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(token) {
  console.log("token", token);
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
