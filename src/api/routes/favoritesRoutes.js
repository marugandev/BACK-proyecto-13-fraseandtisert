const router = require("express").Router();

const { isAuth } = require("../../middlewares/auth");
const {
  getFavorites,
  addFavorite,
  deleteFavorite
} = require("../controllers/favoriteController");

router.get("/", isAuth, getFavorites);
router.post("/:productId", isAuth, addFavorite);
router.delete("/:productId", isAuth, deleteFavorite);

module.exports = router;
