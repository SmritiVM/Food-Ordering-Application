const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();


const requireAuth = (req, res, next) => {
    const token = req.cookies.JWT;
    console.log(token);
    if (token!==undefined) {
        jwt.verify(token, 'secret1135', (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                // res.redirect('http://localhost:3000/login'); // Adjust the path as needed
            } else {
                console.log('hi');
                console.log(decodedToken);
                next();
            }
        });
    } else {
        console.log("No JWT token");
        res.redirect('http://localhost:4000/plateform/redirect');
        // res.redirect('http://localhost:3000/login');
    }
    console.log("hi");
    // res.redirect('http://localhost:4000/plateform/redirect');
}

module.exports = { requireAuth };
