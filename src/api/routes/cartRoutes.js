const router = require("express").Router();

const { isAuth } = require("@middlewares/auth");
const {
  getCart,
  addItemToCart,
  updateCart,
  deleteCart,
  deleteItemFromCart
} = require("@api/controllers/cartController");

router.get("/", isAuth, getCart);
router.post("/", isAuth, updateCart);

router.delete("/", isAuth, deleteCart);

router.post("/add-item", isAuth, addItemToCart);
router.post("/remove-item", isAuth, deleteItemFromCart);

module.exports = router;
