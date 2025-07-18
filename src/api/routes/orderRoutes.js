const router = require("express").Router();

const {
  getOrders,
  getUserOrders,
  addOrder
} = require("../controllers/orderController");
const { isAuth, isAdmin } = require("../../middlewares/auth");

const authMid = [isAuth, isAdmin];

router.get("/", authMid, getOrders);
router.get("/my-orders", isAuth, getUserOrders);
router.post("/", isAuth, addOrder);

module.exports = router;
