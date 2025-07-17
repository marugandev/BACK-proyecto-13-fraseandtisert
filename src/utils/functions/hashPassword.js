const bcrypt = require("bcrypt");

const hashPassword = async (passw) => {
  return await bcrypt.hash(passw, 10);
};

module.exports = hashPassword;
