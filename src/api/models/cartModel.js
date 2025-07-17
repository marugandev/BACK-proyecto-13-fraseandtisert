const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ["filosofia", "ironia", "amor", "supervivencia", "existencial"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: undefined
  },
  featuredImage: {
    type: String
  },
  color: {
    type: String,
    enum: ["white", "black", "gray"],
    required: true
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      unique: true,
      required: true
    },
    items: {
      type: [cartItemSchema],
      default: []
    }
  },
  {
    timestamps: true,
    collection: "carts"
  }
);

const Cart = mongoose.model("cart", cartSchema, "carts");

module.exports = Cart;
