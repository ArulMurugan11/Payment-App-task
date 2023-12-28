const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

async function bcryptHash(passWord) {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(passWord, salt);
  // console.log('hash is --------', hash)
  return hash;
}
async function generateToken(userDetails) {
  return jwt.sign({ userDetails }, process.env.SECRET_KEY, {
    expiresIn: "1hr",
  });
}


module.exports = {
  generateToken,
  bcryptHash,
};
