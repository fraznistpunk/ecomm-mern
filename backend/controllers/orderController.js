import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders/
// @access PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
    res.send("Add order items");
});

// @desc Get logged in user's orders
// @route GET /api/orders/myorders
// @access PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
    res.send("Get my orders");
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
    res.send("Get order by id");
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update order to paid");
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access PRIVATE/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update order to delivered");
});

// @desc Get all orders
// @route GET /api/orders/:id/pay
// @access PRIVATE/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send("Get all orders");
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };

