const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
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
  },
  price: {
    type: Number,
    required: true
  },
  featuredImage: String
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
    items: {
      type: [orderItemSchema],
      default: []
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    shippingAddress: {
      type: String,
      default: undefined
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    paidAt: Date
  },
  {
    timestamps: true,
    collection: "orders"
  }
);

const Order = mongoose.model("order", orderSchema, "orders");

module.exports = Order;
