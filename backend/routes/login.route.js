// Importing necessary dependencies
const express = require("express");
const { LoginModel } = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create an Express Router
const loginRouter = express.Router();

// Route to test the login router
loginRouter.get("/", (req, res) => {
    res.send("Hello World");
});

// Route to add new user details
loginRouter.post("/adddetails", async (req, res) => {
    try {
        // Extract user data from the request body
        let data = req.body;

        // Check if the email already exists in the database
        let existingUser = await LoginModel.find({ email: data.email });

        if (existingUser.length === 0) {
            // Hash the password using bcrypt with a salt factor of 5
            bcrypt.hash(data.password, 5, async (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: "Internal Server Error" });
                } else {
                    // Insert the new user with the hashed password into the database
                    await LoginModel.insertMany([{ ...data, password: hashedPassword }]);
                    res.send("Successfully added");
                }
            });
        } else {
            // If email already exists, send a response indicating it
            res.send("User already exists");
        }
    } catch (error) {
        // Handle any errors that occur during user addition
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to authenticate and login a user
loginRouter.post("/loginUser", async (req, res) => {
    try {
        // Extract user data from the request body
        let data = req.body;

        // Find the user with the provided email in the database
        let user = await LoginModel.find({ email: data.email });

        if (user.length !== 0) {
            // Compare the provided password with the stored hashed password using bcrypt
            bcrypt.compare(data.password, user[0].password, (err, result) => {
                if (result) {
                    // If passwords match, generate a JWT token and send it with user data
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key);
                    res.send({ data: user, token });
                } else {
                    // If passwords do not match, send an error response
                    res.send("Wrong Credentials");
                }
            });
        } else {
            // If no user found with the provided email, send an appropriate response
            res.send("No such user exists");
        }
    } catch (error) {
        // Handle any errors that occur during user authentication
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Export the loginRouter for use in other files
module.exports = {
    loginRouter
};
