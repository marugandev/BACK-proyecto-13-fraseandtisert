const Cart = require("@api/models/cartModel");

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(200).json({
        status: "success",
        message: "Cesta vacía",
        data: []
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Cesta obtenida",
      data: cart.items
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener la cesta",
      errorMessage: error.message
    });
  }
};

const addItemToCart = async (req, res, next) => {
  try {
    const { productId, color, size, quantity, ...rest } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        items: [
          {
            productId,
            color,
            size,
            quantity,
            ...rest
          }
        ]
      });

      return res.status(201).json({
        status: "success",
        data: newCart
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        color,
        size,
        quantity,
        ...rest
      });
    }

    await cart.save();

    return res.status(200).json({
      status: "success",
      message: "Item añadido a la cesta",
      data: cart.items
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al añadir item a la cesta",
      errorMessage: error.message
    });
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { itemsCart } = req.body;

    if (!Array.isArray(itemsCart)) {
      return res.status(400).json({
        status: "error",
        message: "Formato de items inválido"
      });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      {
        user: req.user.id
      },
      {
        user: req.user.id,
        items: itemsCart
      },
      {
        upsert: true,
        new: true
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Cesta actualizada",
      data: updatedCart.items
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al actualizar la cesta",
      errorMessage: error.message
    });
  }
};

const deleteCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({
      user: req.user.id
    });

    return res.status(200).json({
      status: "success",
      message: "Cesta eliminada"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al borrar la cesta",
      errorMessage: error.message
    });
  }
};

const deleteItemFromCart = async (req, res, next) => {
  try {
    const { productId, size, color } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cesta no encontrada"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
        )
    );

    await cart.save();

    return res.status(200).json({
      status: "success",
      message: "Item de la cesta eliminado",
      data: cart.items
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al borrar el item de la cesta",
      errorMessage: error.message
    });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCart,
  deleteCart,
  deleteItemFromCart
};
