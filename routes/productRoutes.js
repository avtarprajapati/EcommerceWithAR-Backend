const express = require('express');
const productController = require('../controllers/productController');

const route = express.Router();

route.param('id', productController.checkID);

route
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

route
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.patchProduct)
  .delete(productController.deleteProduct);

module.exports = route;
