const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const uploadImg = (folderName) => {
  const mainFolder = "proyecto-13-fraseandtisert";

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `${mainFolder}/${folderName}`,
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
      transformation: [{ fetch_format: "webp", quality: "auto:good" }]
    }
  });

  return multer({ storage });
};

module.exports = { uploadImg };
