const Product = require("../models/productModel");
const deleteFile = require("../../utils/functions/deleteFile");

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado"
      });
    }
    res.status(200).json({
      status: "success",
      message: "Producto obtenido por id",
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener el producto por Id",
      errorMessage: error.message
    });
  }
};

const getProductsByIds = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Se requiere un array de Ids"
      });
    }

    const products = await Product.find({ _id: { $in: ids } });

    return res.status(200).json({
      status: "success",
      message: "Productos obtenidos por Ids",
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener productos por Ids",
      errorMessage: error.message
    });
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Producto obtenido",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener el producto por slug",
      errorMessage: error.message
    });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;

    const query = category ? { category } : {};

    const products = await Product.find(query);

    return res.status(200).json({
      status: "success",
      message: "Productos obtenidos",
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al obtener los productos",
      errorMessage: error.message
    });
  }
};

const postProduct = async (req, res, next) => {
  try {
    const data = req.body;

    const productData = {
      ...data,
      variants: JSON.parse(data.variants || "[]")
    };

    if (req.files?.featuredImage?.length) {
      productData.featuredImage = req.files.featuredImage[0].path;
    }

    productData.variants = productData.variants.map((variant, i) => ({
      ...variant,
      images: {
        flat: (req.files[`flat_${i}`] || []).map((f) => f.path),
        lifestyle: (req.files[`lifestyle_${i}`] || []).map((f) => f.path)
      }
    }));

    if (!productData.name || !productData.variants.length) {
      return res.status(400).json({
        status: "error",
        message: "El nombre del producto y al menos una variante son requeridos"
      });
    }

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      status: "success",
      message: "Producto creado",
      data: savedProduct
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al crear el producto",
      errorMessage: error.message
    });
  }
};

const putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado"
      });
    }

    const updatedData = {
      ...req.body,
      variants: JSON.parse(req.body.variants || "[]")
    };

    if (req.files?.featuredImage?.length) {
      updatedData.featuredImage = req.files.featuredImage[0].path;
      if (oldProduct.featuredImage) {
        deleteFile(oldProduct.featuredImage);
      }
    } else {
      updatedData.featuredImage = oldProduct.featuredImage;
    }

    updatedData.variants = updatedData.variants.map((variant, i) => {
      const newFlat = (req.files[`flat_${i}`] || []).map((f) => f.path);
      const newLifestyle = (req.files[`lifestyle_${i}`] || []).map(
        (f) => f.path
      );

      const oldVariant = oldProduct.variants[i] || {
        images: { flat: [], lifestyle: [] }
      };

      const flatImages = newFlat.length ? newFlat : oldVariant.images.flat;
      const lifestyleImages = newLifestyle.length
        ? newLifestyle
        : oldVariant.images.lifestyle;

      if (newFlat.length) oldVariant.images.flat.forEach(deleteFile);
      if (newLifestyle.length) oldVariant.images.lifestyle.forEach(deleteFile);

      return {
        ...variant,
        images: {
          flat: flatImages,
          lifestyle: lifestyleImages
        }
      };
    });

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      status: "success",
      message: "Producto actualizado",
      data: updatedProduct
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al actualizar el producto",
      errorMessage: error.message
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct.featuredImage) {
      deleteFile(deletedProduct.featuredImage);
    }

    deletedProduct.variants.forEach((variant) => {
      variant.images.flat.forEach(deleteFile);
      variant.images.lifestyle.forEach(deleteFile);
    });

    return res.status(200).json({
      status: "success",
      message: "Producto eliminado",
      data: deletedProduct
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor al elinminar el producto",
      errorMessage: error.message
    });
  }
};

module.exports = {
  getProductById,
  getProductsByIds,
  getProductBySlug,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct
};
