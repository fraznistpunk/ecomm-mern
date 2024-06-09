import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import colors from "colors";
import generateToken from "../utils/generateToken.js";

// @desc auth user & get token
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(`${email} + ${password}`.white.inverse);
    const user = await User.findOne({email}); // from mongo
    
    if(user && (await user.matchPassword(password))) {    
        generateToken(res, user._id);
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc auth user & get token
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name, email, password
    });
    if(user) {
        generateToken(res, user._id);
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly : true,
        expires : new Date(0),
    });
    res.status(200).json({message : "Logged out successfully"});
});

// @desc get user profile's details
// @route GET /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc update user profile's details
// @route PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      
      user.email = req.body.email || user.email;
      
      if(req.body.password)
        user.password = req.body.password;
      
      const updateUser = await user.save(); // mongoDb

      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});

// @desc get all users
// @route PUT /api/users
// @access PRIVATE/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("Get all users");
});

// @desc get user by id
// @route GET /api/users/:id
// @access PRIVATE/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("Get user by id");
});

// @desc delete users
// @route DELETE /api/users/:id
// @access PRIVATE/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete user");
});

// @desc update users by admin
// @route PUT /api/users/:id
// @access PRIVATE/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("Update user");
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }