const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const hashPassword = require("../../utils/functions/hashPassword");
const { generateToken } = require("../../utils/functions/jwt");
const validatePatternPassword = require("../../utils/functions/validatePatternPassword");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Token no proporcionado"
    });
  }

  try {
    const decodedToken = await verifyJwt(token);
    const user = await User.findById(decodedToken.id).select(
      "_id userName email role profileImage"
    );

    return res.status(200).json({
      status: "success",
      data: user
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
      errorMessage: error.message
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password)
      return res.status(400).json({
        status: "error",
        message:
          "Fallo en el registro, faltan campos requeridos (nombre de usuario, email o contraseña)"
      });

    const userNameExists = await User.findOne({ userName });
    if (userNameExists)
      return res.status(409).json({
        status: "error",
        message: "El userName ya esta en uso"
      });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(409).json({
        status: "error",
        message: "El email ya esta registrado"
      });

    if (!validatePatternPassword(password))
      return res.status(400).json({
        status: "error",
        message:
          "La contraseña no es válida. Debe tener mínimo 8 caracteres, al menos una letra y un número"
      });

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    const newUserSaved = await newUser.save();

    const { token, expiresIn } = generateToken(newUserSaved._id);

    return res.status(201).json({
      status: "success",
      message: "Usuario registrado",
      data: {
        user: {
          _id: newUserSaved._id,
          userName: newUserSaved.userName,
          email: newUserSaved.email,
          role: newUserSaved.role,
          profileImage: newUserSaved.profileImage
        },
        token,
        expiresIn
      }
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al registrar el usuario",
      errorMessage: error.message
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        status: "error",
        message:
          "Fallo al iniciar sesión, faltan campos requeridos (email o contraseña)"
      });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Email o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Email o contraseña incorrectos"
      });
    }

    const { token, expiresIn } = generateToken(user._id);

    return res.status(200).json({
      status: "success",
      message: "Acceso realizado con éxito",
      data: {
        user: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage
        },
        token,
        expiresIn
      }
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
      errorMessage: error.message
    });
  }
};

module.exports = { verifyToken, register, login };
