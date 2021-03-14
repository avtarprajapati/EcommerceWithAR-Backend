const express = require('express');
const cartController = require('../controllers/cartController');

const route = express.Router();

route
  .route('/')
  .get(cartController.getCartByUser)
  .post(cartController.addToCarts);

module.exports = route;
