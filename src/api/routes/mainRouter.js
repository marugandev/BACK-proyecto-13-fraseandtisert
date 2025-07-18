const mainRouter = require("express").Router();

const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");
const productRouter = require("../routes/productRoutes");
const cartRouter = require("../routes/cartRoutes");
const ordersRouter = require("../routes/orderRoutes");
const favoritesRoutes = require("../routes/favoritesRoutes");

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/orders", ordersRouter);
mainRouter.use("/favorites", favoritesRoutes);

module.exports = mainRouter;
