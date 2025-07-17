const User = require("@api/models/userModel");

const getFavorites = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).populate("favoriteProducts");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }
    return res.status(200).json({
      status: "success",
      data: user.favoriteProducts
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al interno del servidor al obtener los favoritos"
    });
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const productId = req.params.productId;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    if (user.favoriteProducts.includes(productId)) {
      return res.status(400).json({
        status: "error",
        message: "El producto ya está en favoritos"
      });
    }

    user.favoriteProducts.push(productId);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Producto añadido a favoritos"
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al añadir favorito"
    });
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const productId = req.params.productId;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });

    user.favoriteProducts = user.favoriteProducts.filter(
      (favoriteId) => favoriteId.toString() !== productId
    );
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Producto eliminado de favoritos"
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al eliminar favorito"
    });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };
