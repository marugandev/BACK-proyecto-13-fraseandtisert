const User = require("../models/userModel");
const deleteFile = require("../../utils/functions/deleteFile");
const hashPassword = require("../../utils/functions/hashPassword");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("favoriteProducts");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Usuario obtenido",
      data: user
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el usuario",
      errorMessage: error.message
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("favoriteProducts");

    return res.status(200).json({
      status: "success",
      message: "Usuarios obtenidos",
      data: users
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los usuarios",
      errorMessage: error.message
    });
  }
};

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const { userName, email, password, favoriteProducts } = req.body;

    const updatedData = {};
    if (userName && userName !== oldUser.userName) {
      const userNameExists = await User.exists({ userName });
      if (userNameExists && userNameExists._id.toString() !== id) {
        return res.status(400).json({
          status: "error",
          message: "El nombre de usuario ya está en uso"
        });
      }
      updatedData.userName = userName;
    }

    if (email && email !== oldUser.email) {
      const emailExists = await User.exists({ email });
      if (emailExists && emailExists._id.toString() !== id) {
        return res.status(400).json({
          status: "error",
          message: "El email ya esta registrado"
        });
      }
      updatedData.email = email;
    }

    if (req.file) {
      updatedData.profileImage = req.file.path;
      if (oldUser.profileImage) deleteFile(oldUser.profileImage);
    }

    if (favoriteProducts) {
      const productssArray = Array.isArray(favoriteProducts)
        ? favoriteProducts
        : [favoriteProducts];
      updatedData.$addToSet = { favoriteProducts: { $each: productssArray } };
    }

    if (password) updatedData.password = await hashPassword(password);

    const newUserUpdated = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    }).select("-password");

    if (!newUserUpdated) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Usuario actualizado",
      data: newUserUpdated
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);

    if (userDeleted?.profileImage) deleteFile(userDeleted.profileImage);

    return res.status(200).json({
      status: "success",
      message: "Usuario eliminado",
      data: userDeleted
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

module.exports = {
  getUserById,
  getUsers,
  putUser,
  deleteUser
};
