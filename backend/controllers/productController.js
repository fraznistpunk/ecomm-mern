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

// @desc Create a product
// @route POST /api/products/
// @access PRIVATE/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name : 'Sample name',
      price : 0,
      user : req.user._id,
      image : '/images/sample.jpg',
      brand : 'Sample brand',
      category : 'Sample category',
      countInStock : 0,
      numReviews : 0,
      description : 'Sample desc',
    });
    const createdProd = await product.save();
    res.status(201).json(createdProd);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access PRIVATE/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if(product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resoure not found");
  }
});

// @desc delete a product
// @route DELETE /api/products/:id
// @access PRIVATE/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    await Product.deleteOne({ _id : product._id });
    res.status(200).json({message : "Product deleted"});
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct};
