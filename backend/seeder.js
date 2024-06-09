import mongoose from 'mongoose';
import dotenv from "dotenv";
import colors from "colors";
// dummy sample data
import users from './data/users.js';
import products from "./data/products.js";
// as we will seed data using mongoose & defined data models only, any query of insert will
// go through these models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
// to connect to db
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// import data
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users); // returns arr of users
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user : adminUser}
        });
        await Product.insertMany(sampleProducts);
        console.log(`Data imported!`.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error in importing data : ${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
      console.log(`Data destroyed!`.green.inverse);
      process.exit();
    } catch (error) {
      console.log(`Error in destroying data : ${error}`.red.inverse);
      process.exit(1);
    }
};

console.log(process.argv); // returns arr of arguments passed
// we will run this through script, defined in package.json of backend folder
if(process.argv[2] === '-d' || process.argv[2] === '-destroy') {
    destroyData();
} else if(process.argv[2] === '-i' || process.argv[2] === '-import') {
    importData();
}