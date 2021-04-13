const express = require('express');
const cartController = require('../controllers/cartController');

const route = express.Router();

route.route('/:userId').get(cartController.getCartByUser);

module.exports = route;
