const express = require('express');
const bookingController = require('../controllers/bookingController');

const route = express.Router();

route.post('/checkout-session/:userId', bookingController.checkoutSession);
route.get('/:userId', bookingController.getUserBooking);

module.exports = route;
