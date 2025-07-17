const User = require("@api/models/userModel");
const { verifyJwt } = require("@utils/functions/jwt");

const isAuth = async (req, res, next) => {
  try {
    const parsedToken = req.headers.authorization.replace("Bearer ", "");
    if (!parsedToken)
      return res.status(401).json({
        status: "error",
        message: "No estas autorizado"
      });

    const { id } = await verifyJwt(parsedToken);

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "error",
        message: "Token expirado",
        errorMessage: error.message
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "error",
        message: "Token inválido",
        errorMessage: error.message
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
      errorMessage: error.message
    });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    status: "error",
    message: "No estas autorizado"
  });
};

module.exports = { isAuth, isAdmin };
