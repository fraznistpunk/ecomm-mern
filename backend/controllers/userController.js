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
    const users = await User.find({}); // {} because we want all users
    res.status(200).json(users);
});

// @desc get user by id
// @route GET /api/users/:id
// @access PRIVATE/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc delete users
// @route DELETE /api/users/:id
// @access PRIVATE/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        } 
        await User.deleteOne({
            _id : user._id,
        });
        res.status(201).json({message : "User deleted successfully"});
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc update users by admin
// @route PUT /api/users/:id
// @access PRIVATE/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser };