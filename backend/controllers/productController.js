import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products/
// @access PUBLIC
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); // from mongo
    res.json(products);
});

// @desc Fetch specific product
// @route GET /api/products/:id
// @access PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // from mongo
  if (product) {
    // console.log(product);
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {getProducts, getProductById};