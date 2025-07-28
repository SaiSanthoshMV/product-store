
import express from "express"
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    }catch(error){
        res.status(404).json({success: false, message: "surver error"})
        console.log("error in fetching data: ", error.message)
    }
})

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid product Id"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct})
    }catch(error){
        res.status(500).json({success: false, message: "Server error"});
        console.log("error in updating product", error)
    }
})

router.delete('/:id', async (req, res) =>{
    const {id} = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    }catch(error){
        console.log("error in deleting product", error)
        res.status(404).json({success: false, message: "Product Not Found!"});
    }
})

export default router;