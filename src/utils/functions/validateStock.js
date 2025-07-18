const Product = require("../../api/models/productModel");

const validateStock = async (cartItems) => {
  for (const item of cartItems) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return {
        error: true,
        status: "error",
        statusCode: 404,
        message: "Producto no encontrado"
      };
    }

    const variant = product.variants.find((v) => v.color === item.color);
    const availability = variant?.availability.find(
      (a) => a.size === item.size
    );

    if (!availability || availability.quantity < item.quantity) {
      return {
        error: true,
        status: "error",
        statusCode: 400,
        message: "Stock insuficiente"
      };
    }
  }
  return {
    error: false
  };
};

module.exports = validateStock;
