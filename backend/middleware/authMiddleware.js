import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes for registered users
const protect = asyncHandler(async (req, res, next) => {
    let token;
    // read the jwt from the cookie
    token = req.cookies.jwt;
    if(token) {
        try {
            // decode token, returns object
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // set user info in req w/c can be access anywhere
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error("Not authorised, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorised, no token");
    }
});

// admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
       res.status(401);
       throw new Error("Not authorised as admin."); 
    }
}

export { protect, admin };