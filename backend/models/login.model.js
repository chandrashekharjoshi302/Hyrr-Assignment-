// Importing necessary dependencies
const mongoose = require("mongoose");

// Define the login schema
const loginSchema = mongoose.Schema({
    // Define fields for user login information
    image: String,
    email: String,
    name: String,
    password: String,
    confirmpassword: String,
}, {
    // Disable the version key in the document
    versionKey: false
});

// Create a LoginModel using the login schema
const LoginModel = mongoose.model("login", loginSchema);

// Export the LoginModel for use in other files
module.exports = {
    LoginModel
};
