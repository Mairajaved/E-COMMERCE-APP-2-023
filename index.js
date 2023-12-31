/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

//configure env
dotenv.config();
//databse config
connectDB();

//rest object
const app = express();

// Import REACT_APP_API from your .env file
const apiUrl = process.env.REACT_APP_API;

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

///PORT
const SERVER_PORT = process.env.SERVER_PORT || 8080;

//run listen
app.listen(SERVER_PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${SERVER_PORT}`
  );
});
