const router = require("express").Router();

const {
  getProductById,
  getProductBySlug,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct
} = require("../controllers/productController");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const { uploadImg } = require("../../middlewares/file");

const authMid = [isAuth, isAdmin];

router.get("/by-id/:id", getProductById);
router.get("/:slug", getProductBySlug);
router.get("/", getProducts);
router.post("/", [...authMid, uploadImg("products").any()], postProduct);
router.put("/:id", [...authMid, uploadImg("products").any()], putProduct);
router.delete("/:id", [...authMid], deleteProduct);

module.exports = router;
