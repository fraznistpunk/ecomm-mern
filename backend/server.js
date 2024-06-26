import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB(); // Connect to mongo db

const app = express();
const PORT = process.env.PORT || 5000;
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// cookie parser middleware
app.use(cookieParser());

// link "/api/products" routes to productRoute file
app.use("/api/products", productRoutes);
// link "/api/users" routes to userRoute file
app.use("/api/users", userRoutes);
// link "/api/orders" routes to userRoute file
app.use("/api/orders", orderRoutes);
// link "/api/upload" routes to uploadRoutes file
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => res.send({clientId : process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve(); // set dirname to current directory
// console.log("Path : ",__dirname); // i.e. D:/react/ecomm
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV == 'production') {
  //set static folder
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // any route that is not API will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API Running".green.inverse);
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`.green.inverse);  
});