// Importing necessary dependencies
const express = require("express");
const { ProductModel } = require("../models/products.model");

// Create an Express Router
const productRouter = express.Router();

// Route to get products based on query parameters
productRouter.get("/get", async (req, res) => {
    try {
        // Extract query parameters from the request
        let query = req.query;
        let data;

        // Check for specific query parameters and filter products accordingly
        if (query.gender !== undefined && query.category != undefined) {
            data = await ProductModel.find({ $and: [{ category: query.category }, { gender: query.gender }] });
        } else if (query.gender !== undefined) {
            data = await ProductModel.find({ gender: query.gender });
        } else if (query.category !== undefined) {
            data = await ProductModel.find({ category: query.category });
        } else {
            // If no specific parameters provided, retrieve all products
            data = await ProductModel.find();
        }

        // Send the retrieved data as a response
        res.send(data);
    } catch (error) {
        // Handle any errors that occur during data retrieval
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to get a specific product by ID
productRouter.get("/get/:id", async (req, res) => {
    try {
        // Extract product ID from the request parameters
        let id = req.params.id;

        // Find the product with the specified ID
        let data = await ProductModel.find({ _id: id });

        // Send the retrieved data as a response
        res.send(data);
    } catch (error) {
        // Handle any errors that occur during data retrieval
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to add a new product
productRouter.post("/post", async (req, res) => {
    try {
        // Extract product data from the request body
        let data = req.body;

        // Create a new product instance using the ProductModel
        let product = new ProductModel(data);

        // Save the new product to the database
        await product.save();

        // Send a success message as a response
        res.send("Added Successfully.");
    } catch (error) {
        // Handle any errors that occur during product addition
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to delete a product by ID
productRouter.delete("/delete/:id", async (req, res) => {
    try {
        // Extract product ID from the request parameters
        let id = req.params.id;

        // Find and delete the product with the specified ID
        await ProductModel.findByIdAndDelete(id);

        // Send a success message as a response
        res.send("Deleted Successfully.");
    } catch (error) {
        // Handle any errors that occur during product deletion
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Export the productRouter for use in other files
module.exports = {
    productRouter
};
