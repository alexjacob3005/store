// userRoutes.js
const express = require('express');
const router = express.Router();
const { Users } = require('../controller');
const jwt = require('jsonwebtoken');
const fetchUser = require('./authMiddleware');

// API for user registration
router.post('/signup', async (req, res) => {
    // Your user registration logic here
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user with the same email id" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });

});

// API for user login
router.post('/login', async (req, res) => {
    // Your user login logic here
    let user = await Users.findOne({email:req.body.email});
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
          const data = {
              user:{
                  id:user.id
              }
          }
          const token = jwt.sign(data,'secret_ecom');
          res.json({success:true,token});
      }
      else{
          res.json({success:false,errors:"Wrong Password"});
      }
    }
    else{
      res.json({success:false,errors:"Wrong Email Id"})
    }  
});

// Additional user-related routes can be added here

// Placeholder API for user profile
router.get('/profile', fetchUser, async (req, res) => {
    // Fetch user details from the database based on req.user.id
    const userProfile = await Users.findById(req.user.id);
    res.json(userProfile);
});

// Placeholder API for logging out (destroying the token)
router.post('/logout', (req, res) => {
    // You can handle token destruction or any other logout logic here
    res.json({
        success: true,
        message: 'Logout successful',
    });
});

module.exports = router;
