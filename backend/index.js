// Importing necessary dependencies
const mongoose = require("mongoose");
const express = require("express");
const { connection } = require("./configs/db");
const { authenticate } = require("./middleware/Authenticate");
const { loginRouter } = require("./routes/login.route");
const { productRouter } = require("./routes/products.route");
const cors = require("cors");
require("dotenv").config();

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the login router for handling login-related routes
app.use("/login", loginRouter);

// Apply global authentication middleware
app.use(authenticate);

// Use the product router for handling product-related routes
app.use("/product", productRouter);

// Start the server and listen on the specified port
app.listen(process.env.PORT, async () => {
    try {
        // Await database connection establishment
        await connection;
        console.log("Connected to the database");
    } catch (error) {
        // Log any errors that occur during database connection
        console.log("Error connecting to the database:", error.message);
    }
});
