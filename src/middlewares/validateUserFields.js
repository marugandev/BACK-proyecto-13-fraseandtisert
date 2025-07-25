const { validationResult } = require("express-validator");

const validateUserFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array()
    });
  }

  return next();
};

module.exports = { validateUserFields };
