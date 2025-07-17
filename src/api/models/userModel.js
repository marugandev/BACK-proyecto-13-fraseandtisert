const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 50,
      match: [
        /^\S+@\S+\.\S+$/,
        "Introduce un email válido, por ejemplo: usuario@dominio.com"
      ],
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    profileImage: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/cloudcloudinary4/image/upload/v1752508685/proyecto-13-fraseandtisert/assets/images/users/users_default_hnbzjs.webp"
    },
    favoriteProducts: {
      type: [mongoose.Types.ObjectId],
      ref: "product",
      default: [],
      required: false
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
