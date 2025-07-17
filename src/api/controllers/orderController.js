const Order = require("@api/models/orderModel");
const Cart = require("@api/models/cartModel");
const Product = require("@api/models/productModel");

validateStock = require("@utils/functions/validateStock");
const getTotalAmount = require("@utils/functions/getTotalAmount");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({
      status: "success",
      message: "Pedidos obtenidos",
      data: orders
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener los pedidos",
      errorMessage: error.message
    });
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "Historial de pedidos obtenido",
      data: orders
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno al obtener el historial de pedidos",
      errorMessage: error.message
    });
  }
};

const addOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "la cesta esta vacía"
      });
    }

    const checkStock = await validateStock(cart.items);
    if (checkStock.error) {
      return res.status(checkStock.statusCode).json({
        status: checkStock.status,
        message: checkStock.message
      });
    }

    const totalAmount = getTotalAmount(cart.items);

    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalAmount,
      shippingAddress: undefined,
      status: "pending",
      paidAt: undefined
    });

    for (const item of cart.items) {
      await Product.updateOne(
        {
          _id: item.productId,
          "variants.color": item.color,
          "variants.availability.size": item.size
        },
        {
          $inc: {
            "variants.$[v].availability.$[a].quantity": -item.quantity
          }
        },
        {
          arrayFilters: [{ "v.color": item.color }, { "a.size": item.size }]
        }
      );
    }

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    return res.status(201).json({
      status: "success",
      message: "Pedido realizado",
      data: order
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al procesar el pedido",
      errorMessage: error.message
    });
  }
};

module.exports = { getOrders, getUserOrders, addOrder };
