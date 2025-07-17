const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const expiresIn = "7d";
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });

  return { token, expiresIn };
};

const verifyJwt = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return reject(error);

      resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyJwt };
