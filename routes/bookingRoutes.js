const express = require('express');
const bookingController = require('../controllers/bookingController');

const route = express.Router();

route.post('/checkout-session/:userId', bookingController.checkoutSession);

module.exports = route;
