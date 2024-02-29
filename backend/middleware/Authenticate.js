// Importing necessary dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware function for authentication
const authenticate = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    // Check if a token is present
    if (token) {
        try {
            // Verify the token using the secret key from the environment variables
            const decoded = jwt.verify(token, process.env.key);

            // Attach the decoded userID to the request body
            req.body.userID = decoded.userID;

            // Call the next middleware or route handler
            next();
        } catch (error) {
            // Log and send an error response if token verification fails
            console.log(error);
            res.status(401).send("Unauthorized: Token is invalid or expired.");
        }
    } else {
        // Send an error response if no token is provided
        res.status(401).send("Unauthorized: Please provide a valid token.");
    }
};

// Export the authenticate middleware for use in other files
module.exports = {
    authenticate
};
