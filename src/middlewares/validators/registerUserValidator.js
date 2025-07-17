const { body } = require("express-validator");

const registerUserValidator = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("Debe tener entre 3 y 20 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Introduce un email válido, por ejemplo: usuario@dominio.com")
    .isLength({ max: 50 })
    .withMessage("El email no puede tener más de 50 caracteres"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("La contraseña debe contener al menos una letra y un número"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Debes confirmar la contraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    })
];

module.exports = { registerUserValidator };
