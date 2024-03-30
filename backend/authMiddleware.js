// authMiddleware.js

const jwt = require('jsonwebtoken');
const { Users } = require('./controller');

const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).send({ errors: "Please Authenticate using a valid token" });
        }

        const decoded = jwt.verify(token, 'secret_ecom');
        const user = await Users.findById(decoded.user.id);

        if (!user) {
            return res.status(404).send({ errors: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;
