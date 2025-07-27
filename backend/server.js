// const express = require("express");
import express from 'express'; // to use import statement change "type": "module" in package.json
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get('/products', (req, res) => {
    // res.send("Server is ready");
})

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("listening to server at http://localhost:5000/")
})