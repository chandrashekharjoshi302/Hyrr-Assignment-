// Importing necessary dependencies
const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Establish MongoDB connection using the provided connection URL from environment variables
const connection = mongoose.connect(process.env.mongoUrl);

// Export the connection for use in other files
module.exports = {
    connection
};
