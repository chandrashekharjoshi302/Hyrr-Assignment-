// Importing necessary dependencies
const mongoose = require("mongoose");

// Define the product schema
const productSchema = mongoose.Schema({
    // Define fields for product information
    image: String,
    title: String,
    description: String,
});

// Create a ProductModel using the product schema
const ProductModel = mongoose.model("product", productSchema);

// Export the ProductModel for use in other files
module.exports = {
    ProductModel
};
