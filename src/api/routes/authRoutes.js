const router = require("express").Router();

const {
  verifyToken,
  register,
  login
} = require("../controllers/authController");

const { validateUserFields } = require("../../middlewares/validateUserFields");
const {
  loginUserValidator
} = require("../../middlewares/validators/loginUserValidator");
const {
  registerUserValidator
} = require("../../middlewares/validators/registerUserValidator");

const userRegisterValidationMid = [registerUserValidator, validateUserFields];
const userloginValidationMid = [loginUserValidator, validateUserFields];

router.get("/verify", verifyToken);
router.post("/register", userRegisterValidationMid, register);
router.post("/login", userloginValidationMid, login);

module.exports = router;
