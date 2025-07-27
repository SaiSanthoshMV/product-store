// const express = require("express");
import express from 'express'; // to use import statement change "type": "module" in package.json
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/products', async (req, res) => {
    // res.send("Server is ready");
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    }catch{
        console.log("error in saving product: ", error);
        res.status(500).json({ success: false, message: "internal server error"});
    }
})

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("listening to server at http://localhost:5000/")
})