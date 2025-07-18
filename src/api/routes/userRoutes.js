const router = require("express").Router();

const {
  getUserById,
  getUsers,
  putUser,
  deleteUser
} = require("../controllers/userController");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { uploadImg } = require("../../middlewares/file");
const { validateId } = require("../../middlewares/validateId");
const {
  validateUserPermission
} = require("../../middlewares/validateUserPermission");

const { validateUserFields } = require("../../middlewares/validateUserFields");
const {
  updateUserValidator
} = require("../../middlewares/validators/updateUserValidator");

const authAndPermissionMid = [isAuth, validateId, validateUserPermission];
const userUpdateValidationMid = [updateUserValidator, validateUserFields];

router.get("/:id", authAndPermissionMid, getUserById);
router.get("/", [isAuth, isAdmin], getUsers);
router.put(
  "/:id",
  [
    ...authAndPermissionMid,
    ...userUpdateValidationMid,
    uploadImg("users").single("profileImage")
  ],
  putUser
);
router.delete("/:id", authAndPermissionMid, deleteUser);

module.exports = router;
