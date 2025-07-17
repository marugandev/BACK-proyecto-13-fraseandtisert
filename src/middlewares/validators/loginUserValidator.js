const { body } = require("express-validator");

const loginUserValidator = [
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
    .withMessage("La contraseña debe contener al menos una letra y un número")
];

module.exports = { loginUserValidator };
