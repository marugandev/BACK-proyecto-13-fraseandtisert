const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    enum: ["white", "black", "gray"]
  },
  images: {
    flat: [String],
    lifestyle: [String]
  },
  availability: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"]
      },
      quantity: Number
    }
  ]
});

const productSchema = new mongoose.Schema(
  {
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
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
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
    discount: Number,
    isFavorite: {
      type: Boolean,
      default: false
    },
    featured: {
      type: Boolean,
      default: false
    },
    featuredImage: String,
    featuredColor: {
      type: String,
      enum: ["white", "black", "gray"]
    },
    material: String,
    tags: [
      {
        type: String,
        enum: ["recycled", "organic", "limited", "bestseller"]
      }
    ],
    variants: {
      type: [variantSchema],
      required: true
    }
  },
  {
    timestamps: true,
    collection: "products"
  }
);

const Product = mongoose.model("product", productSchema, "products");
module.exports = Product;
