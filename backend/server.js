import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB(); // Connect to mongo db

const app = express();
const PORT = process.env.PORT || 5000;
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running".green.inverse); 
});

// link "/api/products" routes to productRoute file
app.use("/api/products", productRoutes);
// link "/api/users" routes to userRoute file
app.use("/api/users", userRoutes);
// link "/api/orders" routes to userRoute file
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`.green.inverse);  
});