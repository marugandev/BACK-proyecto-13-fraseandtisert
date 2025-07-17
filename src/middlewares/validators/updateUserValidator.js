const { body } = require("express-validator");

const updateUserValidator = [
  body("userName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Introduce un email válido, por ejemplo: usuario@dominio.com")
    .isLength({ max: 50 })
    .withMessage("El email no puede tener más de 50 caracteres"),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("La contraseña debe contener al menos una letra y un número"),

  body("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    })
];

module.exports = { updateUserValidator };
