const mainRouter = require("express").Router();

const authRouter = require("@api/routes/authRoutes");
const userRouter = require("@api/routes/userRoutes");
const productRouter = require("@api/routes/productRoutes");
const cartRouter = require("@api/routes/cartRoutes");
const ordersRouter = require("@api/routes/orderRoutes");
const favoritesRoutes = require("@api/routes/favoritesRoutes");

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/orders", ordersRouter);
mainRouter.use("/favorites", favoritesRoutes);

module.exports = mainRouter;
