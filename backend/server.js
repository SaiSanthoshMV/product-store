// const express = require("express");
import express from 'express'; // to use import statement change "type": "module" in package.json
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();

app.use(express.json());
// console.log(process.env.MONGO_URI);

app.use('/api/products', productRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("listening to server at http://localhost:5000/")
})