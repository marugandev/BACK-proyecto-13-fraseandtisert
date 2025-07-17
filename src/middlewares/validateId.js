const mongoose = require("mongoose");

const validate = (id) => mongoose.Types.ObjectId.isValid(id);

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!validate(id)) {
    return res.status(400).json({
      status: "error",
      message: "Id inválido"
    });
  }
  return next();
};

module.exports = { validateId };
