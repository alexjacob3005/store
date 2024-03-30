// productRoutes.js
const express = require('express');
const router = express.Router();
const { Product } = require('../controller');
const jwt = require('jsonwebtoken');
const fetchUser = require('./authMiddleware');
// router.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:6000/images/${req.file.filename}`
//     });
// });

// API for adding a product
router.post('/addproduct', async (req, res) => {
    // Your add product logic here
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// API for removing a product
router.post('/removeproduct', async (req, res) => {
    // Your remove product logic here
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for fetching all products
router.get('/allproducts', async (req, res) => {
    // Your fetch all products logic here
    console.log("hello from ");
    let products = await Product.find({});
    console.log("All Products fetched");
    res.send(products);
});

// Additional product-related routes can be added here

 // creating endpoint for newcollection data
    router.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Newcollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
    router.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// API for adding products to cart data
router.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

// API for removing products from cart data
router.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
});

// API for getting cart data
router.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Additional placeholder APIs
// Placeholder API for updating a product
router.put('/updateproduct/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body; // Update data in req.body
    await Product.findOneAndUpdate({ id: productId }, updatedData);
    res.json({
        success: true,
        message: `Product with id ${productId} updated successfully,`
    });
});

// Placeholder API for getting a specific product by id
router.get('/getproduct/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });
    res.json(product);
});



module.exports = router;
