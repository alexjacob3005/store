const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require('./config');
const app = express();
const productRoutes = require('./router/productRoutes'); // Import product routes
const userRoutes = require('./router/userRoutes'); // Import user routes

const port = 6000;

app.get("/", (req, res) => {
    res.send("Express App is running");
});

app.use(cors());
app.use(express.json());
app.use('/images', express.static('upload/images'));

// Use product routes
app.use('/products', productRoutes);

// Use user routes
app.use('/users', userRoutes);

// API for removing a product

// API for fetching all products

// API for user registration

//creating endpoint for user login

  
 
// Middleware to fetch user
/*const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please Authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};
*/

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port)
    } else {
        console.log("Error: " + error)
    }
});
