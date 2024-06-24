import express from "express";
// import products from "../data/products.js";
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js";
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

// router.get("/", asyncHandler(async (req, res) => {
//   // get prods from db
//   // empty obj is passed cuz we want all results else we can set options to limit result
  
// }));

// router.get("/:id", asyncHandler(async (req, res) => {
//     //   const product = products.find(
//     //     (product) => parseInt(product._id) === parseInt(req.params.id)
//     //   );
//     const product = await Product.findById(req.params.id); // from mongo
//     if(product) {
//       console.log(product);
//       return res.json(product);
//     } else {
//       res.status(404);
//       throw new Error("Resource not found");
//     }
// }));

export default router;