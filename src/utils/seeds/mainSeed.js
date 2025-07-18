require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../../api/models/userModel");
const usersData = require("../../data/usersData");
const Product = require("../../api/models/productModel");
const productsData = require("../../data/productsData");
const getUsersDataHashed = require("../functions/getUsersDataHashed");

const seed = async (model, modelName, data) => {
  try {
    await model.deleteMany();
    console.log(`${modelName} deleted from the DB`);

    await model.insertMany(data);
    console.log(`${modelName} added to the DB`);
  } catch (error) {
    console.log(`Error seeding ${modelName}:`, error);
  }
};

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the DB");

    const users = await getUsersDataHashed(usersData);

    await seed(User, "Users", users);
    await seed(Product, "Products", productsData);

    await mongoose.disconnect();
    console.log("Disconnected from DB");
    process.exit(0);
  } catch (error) {
    console.error("mainSeed seeding error:", error);
    process.exit(1);
  }
};

runSeed();
