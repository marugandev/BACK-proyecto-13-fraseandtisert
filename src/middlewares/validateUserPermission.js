const validateUserPermission = (req, res, next) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && id !== req.user._id.toString()) {
    return res.status(403).json({
      status: "error",
      message: "No tienes permiso para realizar esta acción"
    });
  }

  return next();
};

module.exports = { validateUserPermission };
