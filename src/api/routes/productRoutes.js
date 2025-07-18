const router = require("express").Router();

const {
  getProductById,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct
} = require("../controllers/productController");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { uploadImg } = require("../../middlewares/file");

const authMid = [isAuth, isAdmin];

router.get("/:id", getProductById);
router.get("/", getProducts);
router.post("/", [...authMid, uploadImg("products").any()], postProduct);
router.put("/:id", [...authMid, uploadImg("products").any()], putProduct);
router.delete("/:id", [...authMid], deleteProduct);

module.exports = router;
