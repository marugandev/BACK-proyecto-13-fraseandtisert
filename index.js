require("module-alias/register");
require("dotenv").config();
require("@api/models");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { connectDB } = require("@config/db");
const { connectCloudinary } = require("@config/cloudinary");
const mainRouter = require("@api/routes/mainRouter");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

connectDB();
connectCloudinary();

app.use("/api/v1", mainRouter);

app.use((req, res, next) => {
  return res.status(404).json("Route not found");
});

/* app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 */
module.exports = app;
